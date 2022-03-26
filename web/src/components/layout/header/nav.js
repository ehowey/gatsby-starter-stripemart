/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import { useSanityMetadata } from "../../../data/useSanityMetadata"
import HamburgerButton from "./hamburgerButton"
import NavLink from "./navLink"

const Nav = ({ isNavOpen, setIsNavOpen }) => {
  const { menuLinks } = useSanityMetadata()
  const [activeDropdown, setActiveDropdown] = useState(null)
  return (
    <nav
      aria-label="Main Navigation Menu"
      sx={{
        gridArea: "nav",
        display: ["block", null, "flex", null, null],
        flexDirection: ["column", null, "row", null, null],
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <div
        sx={{
          // Absolute position is used to handle the menu position in mobile viewports
          position: ["absolute", null, "static", null, null],
          top: "100%",
          right: 0,
          zIndex: ["navmobile", null, "nav", null, null], // Put the nav links under the header
          width: "100%",
          py: [4, null, 0, null, null],
          display: "flex",
          flexDirection: ["column", null, "row", null, null],
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          // Ensure there is a bg when menu is open
          backgroundColor: isNavOpen ? "header.backgroundOpen" : "transparent",
          // Hiding and showing the menu conditionally, still visible for screen readers
          visibility: [
            isNavOpen ? "visible" : "hidden",
            null,
            "visible",
            null,
            null,
          ],
          opacity: [isNavOpen ? 1 : 0, null, 1, null, null],
          transform: [
            isNavOpen ? "translateY(0)" : "translateY(-30%)",
            null,
            "translateY(0)",
            null,
            null,
          ],
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        <ul
          sx={{
            //Reset list styles
            listStyle: "none",
            m: 0,
            p: 0,
            // Nav styles
            position: "relative",
            zIndex: "nav",
            display: "flex",
            flexDirection: ["column", null, "row", null, null],
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuLinks.map((navLink) => (
            <NavLink
              key={navLink.name}
              navLink={navLink}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              isNavOpen={isNavOpen}
              setIsNavOpen={setIsNavOpen}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
