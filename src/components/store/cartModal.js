/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { FiX } from "react-icons/fi"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { useShoppingCart } from "use-shopping-cart/react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"
import "@reach/dialog/styles.css"
import CartForm from "./cartForm"
import { getCartCount } from "../../utils/getCartCount"

const CartModal = () => {
  const {
    formattedTotalPrice,
    handleCloseCart,
    shouldDisplayCart,
    cartDetails,
  } = useShoppingCart()

  // Handle the cart count without shipping items
  const cartCount = getCartCount(cartDetails)

  return (
    <AnimatePresence>
      {shouldDisplayCart && (
        <DialogOverlay
          isOpen={shouldDisplayCart}
          onDismiss={handleCloseCart}
          sx={{
            zIndex: "cart",
          }}
        >
          <motion.div
            initial={{ opacity: 0.7, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200, scale: 0.9 }}
          >
            <DialogContent
              aria-label="Cart"
              sx={{
                width: "100vw !important",
                padding: "1rem !important",
                "@media screen and (min-width: 480px)": {
                  width: "90vw !important",
                  padding: "2rem !important",
                },
                "@media screen and (min-width: 768px)": {
                  width: "80vw !important",
                },
                "@media screen and (min-width: 1200px)": {
                  width: "60vw !important",
                },
              }}
            >
              <div sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    color: "text",
                    bg: "transparent",
                    border: "none",
                    fontSize: 2,
                    display: "flex",
                    fontWeight: "normal",
                    alignItems: "center",
                    ":hover, :focus, :active": {
                      bg: "transparent",
                    },
                  }}
                  onClick={handleCloseCart}
                  aria-label="Close cart"
                >
                  <span sx={{ fontSize: 1, fontWeight: "normal" }}>Close</span>
                  <FiX sx={{ ml: 1 }} />
                </Button>
              </div>
              <Themed.p sx={{ fontSize: 1, color: "textGray", my: 0 }}>
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </Themed.p>
              <Themed.h3 sx={{ fontSize: 3, mt: 0, mb: 4 }}>
                {formattedTotalPrice}
              </Themed.h3>
              <CartForm />
              <Themed.p sx={{ color: "textGray", fontSize: 0, mt: 3, mb: 0 }}>
                <Themed.a
                  as={Link}
                  to="/terms"
                  onClick={handleCloseCart}
                  sx={{
                    color: "textGray",
                    ":hover, :active, :focus": {
                      color: "textGray",
                    },
                  }}
                >
                  Terms and Conditions
                </Themed.a>
              </Themed.p>
            </DialogContent>
          </motion.div>
        </DialogOverlay>
      )}
    </AnimatePresence>
  )
}

export default CartModal
