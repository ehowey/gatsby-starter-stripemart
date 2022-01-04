/** @jsx jsx */
import { jsx } from "theme-ui"

const HamburgerButton = ({ isNavOpen, setIsNavOpen }) => {
  // Shared styles for the spans used in hamburger
  const spanStyles = {
    backgroundColor: "currentColor",
    display: "block",
    height: "2px",
    left: "calc(50% - 10px)",
    position: "absolute",
    transformOrigin: "center",
    transitionDuration: "86ms",
    transitionProperty: "background-color, opacity, transform",
    transitionTimingFunction: "ease-out",
    width: "20px",
  }

  return (
    <button
      aria-haspopup={true}
      aria-expanded={isNavOpen ? true : false}
      aria-label="Toggle Main Navigation Menu"
      onClick={() => setIsNavOpen(!isNavOpen)}
      sx={{
        display: ["block", null, "none", null, null],
        position: "relative",
        // marginLeft: "auto",
        zIndex: "nav", // Ensure the menu button is never covered up
        // Reset base button styles
        padding: 0,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <div sx={{ display: "flex", alignItems: "center" }}>
        <div
          sx={{
            flex: 1,
            mr: 2,
            height: "48px",
            width: "20px",
            position: "relative",
            "span:nth-of-type(1)": {
              top: "calc(50% - 8px)",
              transform: isNavOpen
                ? "translateY(7px) rotate(45deg)"
                : "translateY(0) rotate(0)",
            },
            "span:nth-of-type(2)": {
              top: "calc(50% - 1px)",
              opacity: isNavOpen ? 0 : 1,
            },
            "span:nth-of-type(3)": {
              top: "calc(50% + 6px)",
              transform: isNavOpen
                ? "translateY(-7px) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            },
          }}
        >
          <span aria-hidden="true" sx={{ ...spanStyles }} />
          <span aria-hidden="true" sx={{ ...spanStyles }} />
          <span aria-hidden="true" sx={{ ...spanStyles }} />
        </div>
        <span
          sx={{
            flex: 1,
            fontSize: 1,
            color: isNavOpen ? "header.textOpen" : "header.text",
          }}
        >
          {isNavOpen ? "Close" : "Menu"}
        </span>
      </div>
    </button>
  )
}

export default HamburgerButton
