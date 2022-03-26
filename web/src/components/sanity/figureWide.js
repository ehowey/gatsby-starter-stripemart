/** @jsx jsx */
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { useSanityConfig } from "./useSanityConfig"

const FigureWideSerializer = ({ node }) => {
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
          maxHeight: "400px",
          width: ["100vw", null, null, "85vw", "80vw"],
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: ["-50vw", null, null, "-42.5vw", "-40vw"],
          marginRight: ["-50vw", null, null, "-42.5vw", "-40vw"],
          "@media screen and (min-width: 1920px)": {
            width: "60vw",
            mx: "-30vw",
          },
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

export default FigureWideSerializer
