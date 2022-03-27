/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { FiShoppingCart } from "react-icons/fi"
import { useShoppingCart } from "use-shopping-cart"
import { useViewportScroll } from "framer-motion"
import { useState, useEffect } from "react"

const Cart = () => {
  const { handleCartClick, cartCount } = useShoppingCart()
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
  }, []) //eslint-disable-line

  return (
    <div
      sx={{
        position: ["static", null, "fixed", null, null],
        top: 0,
        right: 0,
        gridArea: "cart",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: [0, null, 3, null, null],
        zIndex: 100,
        backgroundColor: [
          "none",
          null,
          hasScrolled ? "header.backgroundScroll" : "none",
          null,
          null,
        ],
        borderBottomLeftRadius: [0, null, "8px", null, null],
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Button
        onClick={handleCartClick}
        aria-label="Open cart"
        sx={{
          fontSize: [4, 5, 6, null, null],
          bg: "transparent",
          color: "text",
          border: "none",
          position: "relative",
          p: 0,
          m: 0,
          lineHeight: 0,
          ":hover, :focus, :active": {
            bg: "transparent",
          },
        }}
      >
        {cartCount > 0 ? (
          <div
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              borderRadius: "100%",
              bg: "primary",
              color: "white",
              fontSize: ["12px", null, "14px", null, null],
              width: ["20px", null, "22px", null, null],
              height: ["20px", null, "22px", null, null],
              display: "grid",
              placeItems: "center",
            }}
          >
            <span>{cartCount}</span>
          </div>
        ) : null}
        <FiShoppingCart />
      </Button>
    </div>
  )
}

export default Cart
