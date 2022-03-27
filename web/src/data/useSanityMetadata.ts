import { useStaticQuery, graphql } from "gatsby"
import { TypeSiteMetaData } from "../types/types"

export const useSanityMetadata = (): TypeSiteMetaData => {
  const data = useStaticQuery(
    graphql`
      query SanityMetaData {
        allSanityStoreSettings(
          limit: 1
          sort: { fields: _updatedAt, order: DESC }
        ) {
          nodes {
            currency
            hasShipping
            hasAddOns
            paymentMethodTypes
            allowedCountries
          }
        }
        allSanityLogo(limit: 1, sort: { fields: _updatedAt, order: DESC }) {
          nodes {
            desktopLogo {
              asset {
                url
              }
            }
            mobileLogo {
              asset {
                url
              }
            }
          }
        }
        allSanityMainNav(limit: 1, sort: { fields: _updatedAt, order: DESC }) {
          nodes {
            mainNav {
              name
              internalLink
            }
          }
        }
        allSanityAlertBanner(
          limit: 1
          sort: { fields: _updatedAt, order: DESC }
        ) {
          nodes {
            text
            displayAlertBanner
          }
        }
        allSanitySeoDefaults(
          limit: 1
          sort: { fields: _updatedAt, order: DESC }
        ) {
          nodes {
            title
            description
            keywords
            twitter
            facebook
            siteUrl
            seoImage {
              asset {
                url
                metadata {
                  dimensions {
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  // Logos
  const desktopLogo = data.allSanityLogo.nodes[0].desktopLogo?.asset?.url
  const mobileLogo = data.allSanityLogo.nodes[0].mobileLogo?.asset?.url

  // Default Social/Seo Image
  const seoDefaults = data.allSanitySeoDefaults.nodes[0]
  const seoImageSrc = seoDefaults.seoImage.asset.url
  const seoImageHeight = seoDefaults.seoImage.asset.metadata.dimensions.height
  const seoImageWidth = seoDefaults.seoImage.asset.metadata.dimensions.width
  const seoImage = {
    src: seoImageSrc,
    width: seoImageWidth,
    height: seoImageHeight,
  }

  // Get the menuLinks information
  const menuLinks = data.allSanityMainNav.nodes[0].mainNav

  // Get the Alert Banner Data
  const alertBannerData = data.allSanityAlertBanner.nodes[0]

  // Get the Store settings
  const storeSettingsData = data.allSanityStoreSettings.nodes[0]

  return {
    ...seoDefaults,
    seoImage,
    menuLinks,
    desktopLogo,
    mobileLogo,
    alertBannerData,
    storeSettingsData,
  }
}
