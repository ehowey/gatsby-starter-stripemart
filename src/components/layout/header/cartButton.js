/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { FiShoppingCart } from "react-icons/fi"
import { useShoppingCart } from "use-shopping-cart/react"
import { getCartCount } from "../../../utils/getCartCount"

const Cart = () => {
  const { cartDetails, handleCartClick } = useShoppingCart()

  const cartCount = getCartCount(cartDetails)

  return (
    <div
      sx={{
        gridArea: "cart",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: [0, null, 3, null, null],
      }}
    >
      <Button
        onClick={handleCartClick}
        aria-label="Open cart"
        sx={{
          fontSize: [3, 4, 5, null, null],
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
