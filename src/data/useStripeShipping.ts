import { useStaticQuery, graphql } from "gatsby"
import { Shipping } from "../types/types"

export const useStripeShipping = (): Array<Shipping> => {
  const data = useStaticQuery(
    graphql`
      query StripeShippingQuery {
        allStripePrice(
          filter: {
            type: { eq: "one_time" }
            active: { eq: true }
            product: {
              metadata: { shippingOption: { eq: "true" } }
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
            }
          }
        }
      }
    `
  )

  const rawShipping = data.allStripePrice.nodes

  const shipping = rawShipping.map((node) => ({
    name: node.product.name,
    description: node.product.description,
    price_id: node.id,
    price: node.unit_amount,
    currency: node.currency,
    shippingOption: true,
    localOnly: false,
  }))

  const sortedShipping = shipping.sort((a, b) => {
    return a.price - b.price
  })

  return sortedShipping
}
