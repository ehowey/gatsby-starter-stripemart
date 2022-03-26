/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect } from "react"
import Branding from "./branding"
import CartButton from "./cartButton"
import Nav from "./nav"
import { useViewportScroll } from "framer-motion"

const Header = () => {
  // State to handle whether the navigation menu is open or closed based on mobile menu button
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { scrollY } = useViewportScroll()

  useEffect(() => {
    scrollY.onChange((latest) => {
      if (latest > 40) {
        setHasScrolled(true)
      }
      if (latest === 0) {
        setHasScrolled(false)
      }
    })
  }, []) // eslint-disable-line

  return (
    <header
      sx={{
        position: ["sticky", null, "relative", null, null],
        boxShadow: [
          hasScrolled ? "0 1px 2px -1px rgba(0,0,0,0.25)" : "none",
          null,
          "none",
          null,
          null,
        ],
        display: "grid",
        top: 0,
        width: "100%",
        color: isNavOpen ? "header.textOpen" : "header.text",
        transition: "all 0.15s ease-in-out",
        backgroundColor: isNavOpen
          ? "header.backgroundOpen"
          : [
              hasScrolled ? "header.backgroundScroll" : "transparent",
              null,
              "transparent",
              null,
              null,
            ],
        gridArea: "header",
        zIndex: "header", //Header starts at zIndex 100 to try an ensure it is above other content
      }}
      id="header"
    >
      <div
        sx={{
          gridRow: "1 / -1",
          gridColumn: "1 / -1",
          alignSelf: "start",
          m: "0 auto",
          px: [3, null, 3, null, null],
          py: [0, 1, 2, null, null],
          maxWidth: "maxPageWidth",
          width: "100%",
          display: ["grid", null, "block", null, null],
          gridTemplateColumns: "80px 1fr 80px",
          gridTemplateAreas: `"nav branding cart"`,
        }}
      >
        <CartButton />
        <Branding isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Nav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      </div>
    </header>
  )
}

export default Header
