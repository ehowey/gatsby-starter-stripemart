import { useStaticQuery, graphql } from "gatsby"
import { TypeNewShipping } from "../types/types"
import dollarsToCents from "dollars-to-cents"

export const useNewShipping = (): TypeNewShipping => {
  const data = useStaticQuery(
    graphql`
      query NewShippingQuery {
        allSanityNewShipping(
          limit: 1
          sort: { fields: _updatedAt, order: DESC }
        ) {
          nodes {
            hasShipping
            freeShipping {
              description
              freeShippingCutoff
              hasFreeShipping
              title
            }
            localShipping {
              description
              hasLocalShipping
              title
            }
            standardShipping {
              description
              hasStandardShipping
              maxShipping
              minShipping
              percentShipping
              title
            }
          }
        }
      }
    `
  )

  const shippingData = data.allSanityNewShipping.nodes[0]

  const formattedShippingData = {
    id: shippingData?.id,
    hasShipping: shippingData?.hasShipping,
    localShipping: {
      hasLocalShipping: shippingData?.localShipping?.hasLocalShipping,
      title: shippingData?.localShipping?.title,
      description: shippingData?.localShipping?.description,
    },
    standardShipping: {
      hasStandardShipping: shippingData?.standardShipping?.hasStandardShipping,
      title: shippingData?.standardShipping?.title,
      description: shippingData?.standardShipping?.description,
      minShipping: dollarsToCents(
        shippingData?.standardShipping?.minShipping
          ? shippingData?.standardShipping?.minShipping
          : 5
      ),
      maxShipping: dollarsToCents(
        shippingData?.standardShipping?.maxShipping
          ? shippingData?.standardShipping?.maxShipping
          : 20
      ),
      percentShipping: shippingData?.standardShipping?.percentShipping
        ? shippingData?.standardShipping?.percentShipping / 100
        : 0.15,
    },
    freeShipping: {
      hasFreeShipping: shippingData?.freeShipping?.hasFreeShipping,
      title: shippingData?.freeShipping?.title,
      description: shippingData?.freeShipping?.description,
      freeShippingCutoff: dollarsToCents(
        shippingData?.freeShipping?.freeShippingCutoff
          ? shippingData?.freeShipping?.freeShippingCutoff
          : 99
      ),
    },
  }

  return formattedShippingData
}
