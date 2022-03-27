/** @jsx jsx */
import { jsx, Button, Themed } from "theme-ui"
import { FiX } from "react-icons/fi"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import "@reach/dialog/styles.css"

const ProductImageModal = ({
  product,
  displayImageModal,
  setDisplayImageModal,
}) => {
  return (
    <AnimatePresence>
      {displayImageModal && (
        <DialogOverlay
          isOpen={displayImageModal}
          onDismiss={() => setDisplayImageModal(false)}
          sx={{
            zIndex: "cart",
          }}
        >
          <motion.div
            initial={{ opacity: 0.7, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
          >
            <DialogContent
              aria-label="Product Image"
              sx={{
                width: "100vw !important",
                padding: "1rem !important",
                "@media screen and (min-width: 480px)": {
                  width: "90vw !important",
                  padding: "2rem !important",
                },
                "@media screen and (min-width: 768px)": {
                  width: "800px !important",
                  height: "600px !important",
                },
                "@media screen and (min-width: 1200px)": {
                  width: "800px !important",
                  height: "600px !important",
                },
              }}
            >
              <div sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                  onClick={() => setDisplayImageModal(false)}
                  aria-label="Close cart"
                >
                  <span sx={{ fontSize: 1, fontWeight: "normal" }}>Close</span>
                  <FiX sx={{ ml: 1 }} />
                </Button>
              </div>
              <div sx={{ height: "85%", width: "100%", mt: 3 }}>
                <GatsbyImage
                  image={product.image}
                  alt={product.name}
                  imgStyle={{ objectFit: "contain" }}
                  objectFit="contain"
                  sx={{ height: "100%", width: "100%" }}
                />
                <Themed.p
                  sx={{
                    fontSize: [1, 1, 1, 1, 1],
                    color: "textGray",
                    textAlign: "center",
                    mt: 2,
                    mb: 0,
                  }}
                >
                  {product.name}
                </Themed.p>
              </div>
            </DialogContent>
          </motion.div>
        </DialogOverlay>
      )}
    </AnimatePresence>
  )
}

export default ProductImageModal
