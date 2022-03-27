/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { useShoppingCart } from "use-shopping-cart"
import { GatsbyImage } from "gatsby-plugin-image"
import { useWatch, useFormState } from "react-hook-form"
import { useEffect } from "react"

const CartItem = ({ product, register, control, clearErrors, setValue }) => {
  // Get the functions we need from USC
  const { removeItem, setItemQuantity } = useShoppingCart()

  const watchedQuantity = useWatch({
    control,
    name: product.id,
    defaultValue: product.quantity, // default value before the render
  })

  // Get the errors from the cart
  const { errors } = useFormState({
    control,
  })

  // Update the product quantity in the cart
  useEffect(() => {
    const selectedQuantity = parseInt(watchedQuantity)
    if (Number.isInteger(selectedQuantity) && selectedQuantity > 0) {
      setItemQuantity(product.id, selectedQuantity)
    }
  }, [watchedQuantity]) //eslint-disable-line

  const handleClearItem = () => {
    clearErrors(product.id)
    removeItem(product.id)
    product.addOn && setValue(`addOns.${product.id}`, false)
  }

  return (
    <li
      sx={{
        px: [2, 3, null, null, null],
        mb: 2,
        py: 3,
        display: "flex",
        width: "100%",
        alignItems: "center",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "muted",
        borderRadius: "4px",
        bg: errors[product.id]?.type === "max" ? "red.1" : "none",
        ":last-of-type": { mb: 0, border: "none" },
      }}
    >
      <div
        sx={{
          height: "80px",
          width: "80px",
          mr: 3,
        }}
      >
        <GatsbyImage
          image={product.image}
          alt={product.name}
          sx={{ height: "80px", width: "80px", borderRadius: "4px" }}
        />
      </div>
      <div sx={{ flex: 1 }}>
        <Themed.p
          sx={{ my: 0, fontSize: [1, 1, 1, 1, 1], lineHeight: "tight" }}
        >
          <span sx={{ fontWeight: "bold" }}>{product.name}</span> &mdash;{" "}
          {product.formattedValue}
          {product.localOnly && (
            <span sx={{ color: "textError" }}> (local pickup only)</span>
          )}
          <br />
        </Themed.p>
        <label htmlFor={`${product.id}`} sx={{ fontSize: 0, mr: 1 }}>
          Quantity:
        </label>
        <input
          {...register(product.id, {
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
        {errors[product.id]?.type === "max" && (
          <Themed.p
            sx={{
              my: 0,
              fontSize: [0, 0, 0, 0, 0],
              color: "textError",
            }}
          >
            Quantity is more than current inventory
          </Themed.p>
        )}
        {errors[product.id]?.type === "min" && (
          <Themed.p
            sx={{
              my: 0,
              fontSize: [0, 0, 0, 0, 0],
              color: "textError",
            }}
          >
            Please select a valid quantity
          </Themed.p>
        )}
        <Button
          sx={{
            display: "block",
            color: "text",
            textDecoration: "underline",
            p: 0,
            bg: "transparent",
            border: "none",
            fontSize: [0, null, 1, null, null],
            fontWeight: "normal",
            ":hover, :focus, :active": {
              bg: "transparent",
              color: "text",
            },
          }}
          onClick={handleClearItem}
        >
          Remove item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
