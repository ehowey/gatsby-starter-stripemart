/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { useState, Fragment, useEffect } from "react"
import { FiZoomIn, FiShoppingBag } from "react-icons/fi"
import ProductImageModal from "./productImageModal"

const ProductCard = ({ product, allStock, stockStatus }) => {
  // Track whether the user has clicked the buy now button
  const [displayImageModal, setDisplayImageModal] = useState(false)

  // Handle out of stock state
  const [outOfStock, setOutOfStock] = useState(false)

  // Handle stock message
  const [stockMessage, setStockMessage] = useState("...checking stock")

  // Get our functions from u-s-c
  const { addItem, handleCartClick } = useShoppingCart()

  // Handle clicking the add item button
  const handleAddItem = () => {
    addItem(product)
    handleCartClick()
  }

  // Update the stock message
  useEffect(() => {
    if (stockStatus === "LOADING") {
      setStockMessage("...checking stock")
    }
    if (stockStatus === "LOADED") {
      const productStock = allStock.filter(
        (stock) => stock.sanity_id === product.sanity_id
      )[0]
      if (productStock.stock > 0) {
        setStockMessage(`${productStock.stock} available`)
      }
      if (productStock.stock <= 0) {
        setOutOfStock(true)
        setStockMessage("Sold out! Check back soon for more.")
      }
    }
    if (stockStatus === "ERROR") {
      setStockMessage("Inventory error")
    }
  }, [stockStatus])

  // Handle the product image zoom modal
  const handleZoom = () => {
    setDisplayImageModal(true)
  }

  return (
    <Fragment>
      <ProductImageModal
        product={product}
        displayImageModal={displayImageModal}
        setDisplayImageModal={setDisplayImageModal}
      />
      <div
        sx={{
          borderRadius: "4px",
          bg: outOfStock ? "gray.3" : "#ffffff",
          display: "grid",
          gridTemplateColumns: [
            "minmax(0, 1fr)",
            null,
            "minmax(0, 1fr) minmax(0, 1fr)",
            null,
            null,
          ],
          gridTemplateRows: ["300px auto", "400px auto", "auto", null, null],
          gap: [0, null, 4, null, null],
          boxShadow: "default",
        }}
      >
        <div>
          <div
            sx={{
              position: "relative",
              height: ["auto", null, "100%", null, null],
            }}
          >
            <GatsbyImage
              image={product.image}
              alt={product.name}
              objectFit="cover"
              sx={{
                height: ["300px", "400px", "100%", null, null],
                width: "100%",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: ["4px", null, "0px", null, null],
                borderBottomLeftRadius: ["0px", null, "4px", null, null],
              }}
            />
            {product.featured && (
              <div
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: 0,
                  clipPath:
                    "polygon(0% 0%, 100% 0, 90% 50%, 100% 100%, 0% 100%)",
                  bg: "tomato",
                  pl: 2,
                  pr: 3,
                  py: 1,
                }}
              >
                <span
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontSize: 0,
                    color: "black",
                  }}
                >
                  Featured
                </span>
              </div>
            )}
            <Button
              aria-label="Zoom In"
              variant="zoom"
              onClick={handleZoom}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                display: "grid",
                placeItems: "center",
              }}
            >
              <FiZoomIn sx={{ fontSize: 4 }} />
            </Button>
          </div>
        </div>
        <div
          sx={{
            py: 4,
            px: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div sx={{ mb: 4 }}>
            <Themed.h2
              sx={{
                fontSize: [4, 4, 4, 5, 5],
                mt: 0,
                color: outOfStock ? "error" : "text",
              }}
            >
              {product.name}
              {outOfStock && <span> &mdash; Sold out</span>}
            </Themed.h2>
            <Themed.p sx={{ fontSize: [1, 1, 1, 1, 1] }}>
              {product.description}
            </Themed.p>
          </div>
          <div>
            <Themed.p
              sx={{
                fontSize: [4, 4, 4, 4, 4],
                fontWeight: "bold",
                mb: 0,
                color: outOfStock ? "error" : "text",
              }}
            >
              {formatCurrencyString({
                value: parseInt(product.price, 10),
                currency: product.currency,
              })}
            </Themed.p>
            {product.localOnly && (
              <Themed.p
                sx={{
                  color: "textGray",
                  fontSize: [1, 1, 1, 1, 1],
                  fontWeight: 600,
                  my: 0,
                }}
              >
                Local pickup only
              </Themed.p>
            )}
            <Themed.p
              sx={{
                fontSize: [0, 0, 0, 0, 0],
                color: outOfStock ? "error" : "textGray",
                mt: 0,
              }}
            >
              {stockMessage}
            </Themed.p>
            <div>
              <Button
                sx={{ display: "flex", alignItems: "center" }}
                variant="addToCart"
                disabled={outOfStock || stockStatus === "ERROR"}
                onClick={handleAddItem}
              >
                <FiShoppingBag sx={{ mr: 2 }} />
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductCard
