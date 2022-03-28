import { useStaticQuery, graphql } from "gatsby"
import { TypeProduct } from "../types/types"
import dollarsToCents from "dollars-to-cents"

export const useProducts = (): Array<TypeProduct> => {
  const data = useStaticQuery(
    graphql`
      query SanityProductQuery {
        allSanityStoreSettings(
          limit: 1
          sort: { fields: _updatedAt, order: DESC }
        ) {
          nodes {
            currency
          }
        }
        allSanityProduct(filter: { active: { eq: true } }) {
          nodes {
            _id
            _createdAt
            localOnly
            featured
            name
            description
            stock
            price
            slug {
              current
            }
            categories {
              title
              slug {
                current
              }
            }
            image {
              asset {
                gatsbyImageData
              }
            }
          }
        }
        missingImage: file(name: { eq: "missing-image" }) {
          childImageSharp {
            gatsbyImageData(
              height: 500
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
    `
  )

  const rawProducts = data.allSanityProduct.nodes
  const currency = data.allSanityStoreSettings.nodes[0].currency

  // Fallbacks in case values are missing from stripe, fail gracefully
  const missingImage = data.missingImage.childImageSharp.gatsbyImageData
  const missingDescription = "Missing product description..."

  const formattedProducts = rawProducts.map((node) => {
    // Check to make sure there is an image from Stripe otherwise serve a missing image placeholder
    const hasImage =
      node?.image?.asset != null && node?.image?.asset.gatsbyImageData != null
    const productImage = hasImage
      ? node?.image?.asset.gatsbyImageData
      : missingImage

    // Check to make sure there is a description as well and provide a fallback
    const hasDescription = node?.description != null
    const productDescription = hasDescription
      ? node?.description
      : missingDescription

    const productFormatted = {
      name: node.name,
      description: productDescription,
      _createdAt: node._createdAt,
      featured: node.featured,
      categories: node.categories,
      id: node._id,
      price_id: node._id,
      sanity_id: node._id,
      price: dollarsToCents(node.price),
      image: productImage,
      currency: currency,
      stock: node?.stock ?? 1,
      shippingOption: false,
      localOnly: node.localOnly,
      type: "one_time",
    }
    return productFormatted
  })

  const featuredProducts = formattedProducts.filter(
    (product) => product.featured === true
  )
  const sortedProducts = formattedProducts
    .filter((product) => product.featured !== true)
    .sort((a, b) => {
      let dateA = a._createdAt
      let dateB = b._createdAt
      if (dateA > dateB) {
        return -1
      } else if (dateA < dateB) {
        return 1
      }
      return 0
    })

  const products = [...featuredProducts, ...sortedProducts]

  return products
}
