/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { useSiteMetadata } from "../../../data/useSiteMetadata"
import { Link } from "gatsby"
import { FiInstagram } from "react-icons/fi"

const SiteFooter = () => {
  const { title } = useSiteMetadata()

  return (
    <footer
      sx={{
        color: "footer.text",
        backgroundColor: "footer.background",
        px: 3,
        py: 3,
        mt: 5,
        gridArea: "footer",

        a: {
          color: "footer.links",
          ":hover, :active, :focus": {
            color: "footer.links",
          },
        },
      }}
    >
      <Themed.p sx={{ my: 0, fontSize: 3 }}>
        <Themed.a href="https://www.instagram.com/">
          <FiInstagram />
        </Themed.a>
      </Themed.p>
      <Themed.p sx={{ m: 0, fontSize: 1 }}>
        © {new Date().getFullYear()} {title}
      </Themed.p>
      <Themed.p sx={{ m: 0, fontSize: 1 }}>
        <Themed.a as={Link} to="/returns">
          Returns policy
        </Themed.a>
      </Themed.p>
      <Themed.p sx={{ m: 0, fontSize: 1 }}>
        <Themed.a as={Link} to="/terms">
          Terms and conditions
        </Themed.a>{" "}
        &bull;{" "}
        <Themed.a as={Link} to="/privacy">
          Privacy
        </Themed.a>
      </Themed.p>
    </footer>
  )
}

export default SiteFooter
