/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
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
          bg: "secondary",
        },
        ":last-of-type": {
          mr: 0,
        },
      }}
    >
      <Themed.a
        sx={{
          position: "relative",
          py: 2,
          px: 2,
          fontSize: 3,
          textDecoration: "none",
          color: "text",
          fontFamily: "heading",
          fontWeight: 700,
          letterSpacing: "1px",
          borderRadius: "4px",
          zIndex: "nav", // Keep links on top of submenus
          transition: "all 0.3s ease-in-out",
          ":hover, :focus, :active": {
            textDecoration: "none",
            color: "#000000",
            bg: "secondary",
          },
        }}
        as={Link}
        activeClassName="active"
        to={`${navLink.link}`}
        onClick={() => setIsNavOpen(false)}
      >
        {navLink.name}
      </Themed.a>
    </li>
  )
}

export default NavLink
