import { useStaticQuery, graphql } from "gatsby"
import { SiteMetaData } from "../types/types"

export const useSiteMetadata = (): SiteMetaData => {
  const data = useStaticQuery(
    graphql`
      query SiteMetaData {
        logo: file(name: { eq: "stripemart-icon" }) {
          childImageSharp {
            gatsbyImageData(
              height: 300
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
        seoImage: file(name: { eq: "default-social" }) {
          childImageSharp {
            resize(width: 1024) {
              src
              width
              height
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            keywords
            author
            siteUrl
            twitterUsername
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  )

  const logo = data.logo.childImageSharp.gatsbyImageData
  const seoImage = data.seoImage.childImageSharp.resize
  const metaData = data.site.siteMetadata
  const allData = { ...metaData, logo, seoImage }
  return allData
}
