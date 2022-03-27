/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { useSanityConfig } from "./useSanityConfig"

const FigureSerializer = ({ node }) => {
  const { sanityConfig } = useSanityConfig()

  if (!node.asset) {
    return null
  }

  const fluidProps = getGatsbyImageData(
    node.asset,
    { maxWidth: 1440 },
    sanityConfig
  )

  return (
    <figure
      sx={{
        mx: 0,
        mb: 3,
      }}
    >
      <GatsbyImage
        image={fluidProps}
        sx={{
          minHeight: ["300px", "auto", null, null, null],
        }}
        alt={node.alt}
      />
      {node.showCaption && (
        <figcaption
          sx={{
            color: "textGray",
            fontSize: [0, 1, null, null, null],
            textAlign: "center",
            mt: 1,
          }}
        >
          {node.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default FigureSerializer
