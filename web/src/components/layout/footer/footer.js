/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { useSanityMetadata } from "../../../data/useSanityMetadata"
import { Link } from "gatsby"
import { FiInstagram } from "react-icons/fi"

const SiteFooter = () => {
  const { title } = useSanityMetadata()

  return (
    <footer
      sx={{
        color: "footer.text",
        backgroundColor: "footer.background",
        px: 3,
        py: 3,
        mt: 5,
        gridArea: "footer",
        display: "flex",
        flexDirection: ["column-reverse", "row", null, null, null],

        alignItems: ["left", "center", null, null, null],
        gap: [4, 3, null, null, null],
        justifyContent: "space-between",
        a: {
          color: "footer.links",
          ":hover, :active, :focus": {
            color: "footer.links",
          },
        },
      }}
    >
      <div>
        <Themed.p sx={{ my: 0, fontSize: [4, 4, 4, 4, 4] }}>
          <Themed.a href="https://www.instagram.com/west.wind.wool/">
            <FiInstagram />
          </Themed.a>
        </Themed.p>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          © {new Date().getFullYear()} {title}
        </Themed.p>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          <Themed.a as={Link} to="/returns">
            Returns policy
          </Themed.a>
        </Themed.p>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          <Themed.a as={Link} to="/terms">
            Terms and conditions
          </Themed.a>{" "}
          &bull;{" "}
          <Themed.a as={Link} to="/privacy">
            Privacy
          </Themed.a>
        </Themed.p>
      </div>
      <div sx={{ mb: [4, 0, null, null, null] }}>
        <img
          src="/yarn-heart.svg"
          alt="ball of wool with a heart"
          width="180"
          height="60"
          sx={{
            height: "60px",
            width: "180px",
            aspectRatio: "attr(width) / attr(height)",
          }}
        />
      </div>
    </footer>
  )
}

export default SiteFooter
