/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

const NavLink = ({ navLink, setIsNavOpen }) => {
  return (
    <li
      sx={{
        textAlign: ["center", null, "left", null, null],
        my: [2, null, 0, null, null],
        mr: [0, null, 4, null, null],
        // Active link styles for the specific page
        ".active": {
          bg: "header.navHover",
        },
        ":last-of-type": {
          mr: 0,
        },
      }}
    >
      <Link
        sx={(t) => ({
          ...t.styles.a,
          position: "relative",
          py: 2,
          px: 2,
          fontSize: [4, null, null, 5, null],
          textDecoration: "none",
          color: "text",
          fontFamily: "heading",
          fontWeight: 700,
          letterSpacing: "wide",
          borderRadius: "4px",
          zIndex: "nav", // Keep links on top of submenus
          transition: "all 0.3s ease-in-out",
          ":hover, :focus, :active": {
            textDecoration: "none",
            color: "#000000",
            bg: "header.navHover",
          },
        })}
        activeClassName="active"
        to={`${navLink.internalLink}`}
        onClick={() => setIsNavOpen(false)}
      >
        {navLink.name}
      </Link>
    </li>
  )
}

export default NavLink
