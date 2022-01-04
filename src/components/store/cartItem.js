/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { useShoppingCart } from "use-shopping-cart"
import { GatsbyImage } from "gatsby-plugin-image"
import { FiX } from "react-icons/fi"
import { useWatch, useFormState } from "react-hook-form"
import { useEffect } from "react"

const CartItem = ({ product, register, control, clearErrors }) => {
  const productId = product.id

  const { removeItem, setItemQuantity } = useShoppingCart()

  const quantity = useWatch({
    control,
    name: product.id,
    defaultValue: product.quantity, // default value before the render
  })

  const { errors } = useFormState({
    control,
  })

  useEffect(() => {
    const selectedQuantity = parseInt(quantity)
    if (Number.isInteger(selectedQuantity) && selectedQuantity > 0) {
      setItemQuantity(product.id, selectedQuantity)
    }
  }, [quantity]) //eslint-disable-line

  const handleClearItem = () => {
    clearErrors(productId)
    removeItem(product.id)
  }

  return (
    <li
      sx={{
        mb: 2,
        display: "flex",
        width: "100%",
        alignItems: "center",
        ":last-of-type": { mb: 0, border: "none" },
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "muted",
      }}
    >
      <div
        sx={{
          borderRadius: "4px",
          my: 3,
          height: "60px",
          width: "60px",
          mr: 2,
        }}
      >
        <GatsbyImage
          image={product.image}
          alt={product.name}
          sx={{ height: "60px", borderRadius: "4px" }}
        />
      </div>
      <div sx={{ flex: 1 }}>
        <Themed.p sx={{ my: 0, fontSize: 1, lineHeight: "tight" }}>
          <span sx={{ fontWeight: "bold" }}>{product.name}</span> &mdash;{" "}
          <span sx={{}}>{product.formattedPrice}</span>
          <br />
        </Themed.p>
        <label htmlFor={productId} sx={{ fontSize: 0, mr: 1 }}>
          Quantity:
        </label>
        <input
          {...register(productId, {
            valueAsNumber: true,
            min: 1,
            max: product.stock,
          })}
          defaultValue={product.quantity}
          min="1"
          max="99"
          type="number"
          sx={{
            fontSize: 0,
            lineHeight: "tight",
            px: 1,
            py: "2px",
            borderColor: "textGray",
            borderRadius: "2px",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        />
        {errors[productId]?.type === "max" && (
          <Themed.p
            sx={{
              my: 0,
              fontSize: 0,
              color: "error",
            }}
          >
            Quantity is more than current inventory
          </Themed.p>
        )}
        {errors[productId]?.type === "min" && (
          <Themed.p
            sx={{
              my: 0,
              fontSize: 0,
              color: "error",
            }}
          >
            Please select a valid quantity
          </Themed.p>
        )}
      </div>
      <div sx={{ justifySelf: "flex-end" }}>
        <Button
          sx={{
            color: "text",
            bg: "transparent",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "textGray",
            fontSize: [0, null, 1, null, null],
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            ":hover, :focus, :active": {
              bg: "muted",
            },
          }}
          onClick={handleClearItem}
        >
          <FiX sx={{ mr: 1 }} />
          Remove item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
