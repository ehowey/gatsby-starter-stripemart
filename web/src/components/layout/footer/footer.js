/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { useSanityMetadata } from "../../../data/useSanityMetadata"
import { Link } from "gatsby"

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
        a: {
          color: "footer.links",
          ":hover, :active, :focus": {
            color: "footer.links",
          },
        },
      }}
    >
      <div>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          © {new Date().getFullYear()} {title}
        </Themed.p>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          <Link to="/returns" sx={(t) => ({ ...t.styles.a })}>
            Returns policy
          </Link>
        </Themed.p>
        <Themed.p sx={{ m: 0, fontSize: [1, 1, 1, 1, 1] }}>
          <Link to="/terms" sx={(t) => ({ ...t.styles.a })}>
            Terms and conditions
          </Link>{" "}
          &bull;{" "}
          <Link to="/privacy" sx={(t) => ({ ...t.styles.a })}>
            Privacy
          </Link>
        </Themed.p>
      </div>
    </footer>
  )
}

export default SiteFooter
