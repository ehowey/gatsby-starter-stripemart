import { useStaticQuery, graphql } from "gatsby"
import dollarsToCents from "dollars-to-cents"
import { TypeAddOn } from "../types/types"

export const useAddOns = (): Array<TypeAddOn> => {
  const data = useStaticQuery(
    graphql`
      query StripeAddOnQuery {
        allSanityAddOn(filter: { active: { eq: true } }) {
          nodes {
            _id
            name
            price
            stock
            slug {
              current
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

  const rawAddOns = data.allSanityAddOn.nodes
  const missingImage = data.missingImage.childImageSharp.gatsbyImageData

  const addOns = rawAddOns.map((node) => {
    // Check to make sure there is an image from Stripe otherwise serve a missing image placeholder
    const hasImage =
      node?.image?.asset != null && node?.image?.asset.gatsbyImageData != null
    const productImage = hasImage
      ? node?.image?.asset.gatsbyImageData
      : missingImage
    const formattedAddOn = {
      name: node.name,
      id: node._id,
      sanity_id: node._id,
      price_id: node._id,
      price: dollarsToCents(node.price),
      currency: "CAD",
      addOn: true,
      image: productImage,
      type: "one_time",
    }
    return formattedAddOn
  })

  const sortedAddOns = addOns.sort((a, b) => {
    return a.price - b.price
  })

  return sortedAddOns
}
