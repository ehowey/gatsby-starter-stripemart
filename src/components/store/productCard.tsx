/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { useEffect, useState } from "react"

const ProductCard = ({ product }) => {
  // Track whether the user has clicked the buy now button
  const [clickedBuyNow, setClickedBuyNow] = useState(false)

  // State for the stock
  const [stock, setStock] = useState(null)

  // State for the stock status
  const [stockStatus, setStockStatus] = useState("LOADING")

  // Get our functions from u-s-c
  const { addItem, handleCartClick } = useShoppingCart()

  // Handle clicking the add item button
  const handleAddItem = () => {
    addItem(product)
    handleCartClick()
  }

  // Make sure state resets when the product reloads, helps prevent showing the spinner
  useEffect(() => {
    setClickedBuyNow(false)
  }, [])

  // Dynamically check and update the stock from Stripe
  useEffect(() => {
    fetch(`/.netlify/functions/check-stock?priceId=${product.price_id}`)
      .then((res) => res.json())
      .then((data) => {
        setStock(data.stock)
        if (data.stock === 0) {
          setStockStatus("SOLD_OUT")
        } else if (data.stock >= 1) {
          setStockStatus(`IN_STOCK`)
        } else {
          setStockStatus("ERROR")
        }
      })
  }, []) // eslint-disable-line

  // Set the stock message
  const stockMessage = () => {
    if (stockStatus === "LOADING") {
      return "...checking stock"
    }
    if (stockStatus === "IN_STOCK") {
      return `${stock} available`
    }
    if (stockStatus === "SOLD_OUT") {
      return `Sold out! Check back soon for more.`
    }
    return `Inventory error.`
  }

  return (
    <div
      sx={{
        padding: 3,
        backgroundColor: "muted",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Themed.h2
          sx={{
            fontSize: [2, 2, 2, 2, 2],
            mt: 0,
            color: stockStatus === "SOLD_OUT" ? "error" : "text",
          }}
        >
          {product.name}
          {stockStatus === "SOLD_OUT" && <span> &mdash; Sold out</span>}
        </Themed.h2>
        <div
          sx={{
            borderRadius: "4px",
            my: 3,
            height: ["180px", "200px", "250px", "300px", null],
            width: ["180px", "200px", "250px", "300px", null],
          }}
        >
          <GatsbyImage
            image={product.image}
            alt={product.name}
            sx={{
              borderRadius: "4px",
              aspectRatio: "1 / 1",
              height: ["180px", "200px", "250px", "300px", null],
              width: ["180px", "200px", "250px", "300px", null],
            }}
          />
        </div>
        <Themed.p sx={{ fontSize: 1 }}>{product.description}</Themed.p>
      </div>
      <div>
        <Themed.p
          sx={{
            fontSize: 1,
            fontWeight: "bold",
            mb: 0,
            color: stockStatus === "SOLD_OUT" ? "error" : "text",
          }}
        >
          {formatCurrencyString({
            value: parseInt(product.price, 10),
            currency: product.currency,
          })}
        </Themed.p>
        <Themed.p sx={{ fontSize: 0, color: "textGray", mt: 0 }}>
          {stockMessage()}
        </Themed.p>
        <div sx={{ display: "flex", gap: 3 }}>
          <Button
            disabled={
              clickedBuyNow ||
              stockStatus === "SOLD_OUT" ||
              stockStatus === "ERROR"
            }
            sx={{
              fontWeight: "bold",
              width: "120px",
              ":disabled": {
                opacity: 0.5,
                cursor: "default",
              },
              ":disabled:hover, :disabled:active, :disabled:focus": {
                bg: "primary",
              },
            }}
            onClick={handleAddItem}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

// Unused code for Buy Now action
// // Handle clicking the buy now button, using a timeout to reset it after 5 seconds
// const handleBuyNow = () => {
//   setClickedBuyNow(true)
//   setTimeout(() => {
//     setClickedBuyNow(false)
//   }, 8000)
//   checkoutSingleItem({ productId: product.price_id })
// }

// Unused code for Buy Now Button
// <Button
//   disabled={
//     clickedBuyNow ||
//     stockStatus === "SOLD_OUT" ||
//     stockStatus === "ERROR"
//   }
//   sx={{
//     width: "120px",
//     display: "grid",
//     placeItems: "center",
//     ":disabled": {
//       opacity: 0.5,
//       cursor: "default",
//     },
//     ":disabled:hover, :disabled:active, :disabled:focus": {
//       bg: "primary",
//     },
//   }}
//   onClick={handleBuyNow}
// >
//   {clickedBuyNow ? (
//     <FiLoader
//       sx={{
//         fontSize: 3,
//         animation: "spin infinite 5s linear",
//         "@keyframes spin": {
//           from: {
//             transform: "rotate(0deg)",
//           },
//           to: {
//             transform: "rotate(360deg)",
//           },
//         },
//       }}
//     />
//   ) : (
//     `Buy now`
//   )}
// </Button>
