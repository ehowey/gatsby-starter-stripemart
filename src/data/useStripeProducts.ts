import { useStaticQuery, graphql } from "gatsby"
import { Product } from "../types/types"
export const useStripeProducts = (): Array<Product> => {
  const data = useStaticQuery(
    graphql`
      query StripeProductQuery {
        allStripePrice(
          filter: {
            type: { eq: "one_time" }
            active: { eq: true }
            product: {
              metadata: { shippingOption: { ne: "true" } }
              active: { eq: true }
            }
          }
        ) {
          nodes {
            id
            active
            unit_amount
            type
            currency
            product {
              id
              name
              description
              metadata {
                stock
                localOnly
              }
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
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

  const rawProducts = data.allStripePrice.nodes

  // Fallbacks in case values are missing from stripe, fail gracefully
  const missingImage = data.missingImage.childImageSharp.gatsbyImageData
  const missingDescription = "Missing product description..."

  const products = rawProducts.map((node) => {
    // Check to make sure there is an image from Stripe otherwise serve a missing image placeholder
    const hasImage =
      node.product?.localFiles != null &&
      node.product?.localFiles[0]?.childImageSharp?.gatsbyImageData != null
    const productImage = hasImage
      ? node.product?.localFiles[0]?.childImageSharp?.gatsbyImageData
      : missingImage

    const localOnlyValue = node.product?.metadata.localOnly === "true"

    // Check to make sure there is a description as well and provide a fallback
    const hasDescription = node.product.description != null
    const productDescription = hasDescription
      ? node?.product?.description
      : missingDescription

    const productFormatted = {
      name: node.product.name,
      description: productDescription,
      price_id: node.id,
      price: node.unit_amount,
      image: productImage,
      currency: node.currency,
      stock: parseInt(node.product.metadata.stock),
      shippingOption: false,
      localOnly: localOnlyValue,
    }
    return productFormatted
  })

  return products
}
