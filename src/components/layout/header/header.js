/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import Branding from "./branding"
import CartButton from "./cartButton"
import Nav from "./nav"

const Header = () => {
  // State to handle whether the navigation menu is open or closed based on mobile menu button
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <header
      sx={{
        position: ["sticky", null, "relative", null, null],
        display: "grid",
        top: 0,
        width: "100%",
        color: isNavOpen ? "header.textOpen" : "header.text",
        backgroundColor: isNavOpen
          ? "header.backgroundOpen"
          : "header.background",
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
          py: [1, null, 2, null, null],
          maxWidth: "maxPageWidth",
          width: "100%",
          display: "grid",
          gridTemplateColumns: ["80px 1fr 80px", null, "1fr", null, null],
          gridTemplateAreas: [
            `
          "nav branding cart" 
          `,
            null,
            `
          "cart"
          "branding"
          "nav"
          `,
            null,
            null,
          ],
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
