/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useSanityMetadata } from "../../data/useSanityMetadata"
import { useLocation } from "@reach/router"
import { TypeSeo } from "../../types/types"

const Seo = ({
  description,
  lang,
  meta,
  location,
  keywords,
  title,
}: TypeSeo) => {
  // Get site metadata to use as defaults and fallbacks
  const {
    title: defaultTitle,
    description: defaultDescription,
    keywords: defaultKeywords,
    twitterUsername,
    seoImage: defaultSeoImage,
    siteUrl,
  } = useSanityMetadata()

  // Need to check the incoming props to make sure they are the proper shape and type. Then assign the values to be passed into React Helmet.
  // Check that the title is not empty, null or undefined otherwise pass default title
  const seoTitle: string = title != null && title !== "" ? title : defaultTitle
  // Check that the description is not empty, null or undefined otherwise pass default description
  const seoDescription: string =
    description != null && description !== "" ? description : defaultDescription
  // Check that the keywords is not empty, null or undefined otherwise pass default keywords
  const seoKeywords: Array<string> =
    keywords != null && keywords.length > 0 ? keywords : defaultKeywords
  // Get the image source url
  const seoImgSrc: string = defaultSeoImage.src
  // Get the image dimensions
  const seoImgWidth: number = defaultSeoImage.width
  const seoImgHeight: number = defaultSeoImage.height

  // Check location to create canonical links
  const resolvedLocation = useLocation()
  const seoCanononical: string = location || resolvedLocation.pathname

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={seoTitle}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: seoDescription,
        },
        {
          name: `image`,
          content: seoImgSrc,
        },
        // Core ppen graph information
        {
          property: `og:title`,
          content: seoTitle,
        },
        {
          property: `og:description`,
          content: seoDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: seoImgSrc,
        },
        {
          property: `og:image:alt`,
          content: seoTitle,
        },
        { property: `og:image:width`, content: `${seoImgWidth}` },
        { property: `og:image:height`, content: `${seoImgHeight}` },
        // Twitter information
        {
          name: `twitter:title`,
          content: seoTitle,
        },
        {
          name: `twitter:description`,
          content: seoDescription,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },

        {
          name: `twitter:image`,
          content: seoImgSrc,
        },
        {
          name: `twitter:image:alt`,
          content: seoTitle,
        },
      ]
        // Only add keywords if they actually exist as an array
        .concat(
          seoKeywords.length > 0
            ? {
                name: `keywords`,
                content: seoKeywords.join(`, `),
              }
            : []
        )
        // Only add Twitter username if it exists
        .concat(
          twitterUsername != null && twitterUsername !== ""
            ? [
                {
                  name: `twitter:creator`,
                  content: twitterUsername,
                },
                {
                  name: `twitter:site`,
                  content: twitterUsername,
                },
              ]
            : []
        )
        // Add in any other metadata coming from the props
        .concat(meta)}
    >
      <link rel="canonical" href={`${siteUrl}${seoCanononical}`} />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  isBlogPost: false,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  isBlogPost: PropTypes.bool,
}

export default Seo
