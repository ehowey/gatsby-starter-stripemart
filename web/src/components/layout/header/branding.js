/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import { useSanityMetadata } from "../../../data/useSanityMetadata"

const Branding = ({ isNavOpen, setIsNavOpen }) => {
  const { title, desktopLogo, mobileLogo } = useSanityMetadata()

  return (
    <div
      // Container div
      sx={{
        gridArea: "branding",
        display: "flex",
        flexGrow: "0",
        flexShrink: "0",
        alignItems: "center",
        justifyContent: "center",
        ml: 2,
        mr: 2,
        mb: [0, null, 4, null, null],
        mt: [0, null, 5, null, null],
        zIndex: "branding", // Ensure the branding is never covered up
      }}
    >
      <Link
        // Link wrapper that points back to the homepage when clicked
        to="/"
        onClick={() => setIsNavOpen(false)}
        sx={{ textDecoration: "none" }}
      >
        <img
          src={desktopLogo}
          alt={title}
          width="50"
          height="50"
          sx={{
            height: ["40px", "50px", "200px", "225px", "250px"],
            width: ["40px", "50px", "200px", "225px", "250px"],
            aspectRatio: "attr(width) / attr(height)",
            display: ["none", null, "block", null, null],
          }}
        />
        <img
          src={mobileLogo}
          alt={title}
          width="80"
          height="40"
          sx={{
            height: ["25px", "40px", null, null, null],
            width: ["50px", "80px", null, null, null],
            aspectRatio: "attr(width) / attr(height)",
            display: ["block", null, "none", null, null],
          }}
        />
      </Link>
    </div>
  )
}

export default Branding
