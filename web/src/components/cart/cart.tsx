/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { FiX } from "react-icons/fi"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { useShoppingCart } from "use-shopping-cart"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "gatsby"
import "@reach/dialog/styles.css"
import CartForm from "./cartForm"

const Cart = () => {
  const { formattedTotalPrice, handleCloseCart, shouldDisplayCart, cartCount } =
    useShoppingCart()

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
                margin: "4vh auto !important",
                padding: "0rem !important",
                "@media screen and (min-width: 480px)": {
                  width: "90vw !important",
                },
                "@media screen and (min-width: 768px)": {
                  width: "80vw !important",
                },
                "@media screen and (min-width: 1200px)": {
                  width: "60vw !important",
                },
              }}
            >
              <div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: [3, 4, null, null, null],
                  px: [3, 4, null, null, null],
                }}
              >
                <Button
                  sx={{
                    color: "text",
                    bg: "transparent",
                    border: "none",
                    fontSize: 3,
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
              <div sx={{ px: [3, 4, null, null, null], mb: "1.5rem" }}>
                <Themed.p
                  sx={{ fontSize: [1, 1, 1, 1, 1], color: "textGray", my: 0 }}
                >
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </Themed.p>
                <Themed.h3 sx={{ fontSize: 4, my: 0, fontFamily: "body" }}>
                  {formattedTotalPrice}
                </Themed.h3>
                <Themed.p
                  sx={{ fontSize: [1, 1, 1, 1, 1], my: 0, color: "textGray" }}
                >
                  + shipping and handling
                </Themed.p>
              </div>
              <CartForm />
              <Themed.p
                sx={{
                  color: "textGray",
                  fontSize: [0, 0, 0, 0, 0],
                  mt: 3,
                  mb: 0,
                  px: [3, 4, null, null, null],
                  pb: [3, 4, null, null, null],
                }}
              >
                <Link
                  to="/terms"
                  onClick={handleCloseCart}
                  sx={(t) => ({
                    ...t.styles.a,
                    color: "textGray",
                    ":hover, :active, :focus": {
                      color: "textGray",
                    },
                  })}
                >
                  Terms and Conditions
                </Link>
              </Themed.p>
            </DialogContent>
          </motion.div>
        </DialogOverlay>
      )}
    </AnimatePresence>
  )
}

export default Cart
