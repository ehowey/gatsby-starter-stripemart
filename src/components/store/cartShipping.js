/** @jsx jsx */
import { Themed, jsx } from "theme-ui"
import slugify from "slugify"
import { useStripeShipping } from "../../data/useStripeShipping"
import { formatCurrencyString } from "use-shopping-cart/react"
import { FiTruck } from "react-icons/fi"

const CartShipping = ({ register, hasLocalOnly }) => {
  // Get the shipping options
  const shippingOptions = useStripeShipping()

  return (
    <div sx={{ mb: 4 }}>
      <Themed.h2
        sx={{
          fontSize: [1, 1, 1, 1, 1],
          display: "flex",
          alignItems: "cemter",
          gap: 2,
        }}
      >
        <FiTruck sx={{ fontSize: 2 }} />
        Shipping options
      </Themed.h2>
      {hasLocalOnly && (
        <Themed.p sx={{ color: "error", fontSize: 0, mt: -2 }}>
          There is an item in your cart that requires local pickup.
        </Themed.p>
      )}
      {shippingOptions.map((shipping) => (
        <label
          key={shipping.name}
          htmlFor={slugify(shipping.name)}
          disabled={hasLocalOnly && !shipping.shippingLocal}
          sx={{
            display: "grid",
            gridTemplateColumns: "1em auto",
            gap: 2,
            fontSize: 1,
            mb: 2,
            cursor: "pointer",
            ":last-of-type": {
              mb: 0,
            },
            ":disabled": {
              color: "muted",
            },
          }}
        >
          <input
            sx={{
              appearance: "none",
              backgroundColor: "#ffffff",
              margin: 0,
              font: "inherit",
              color: "currentColor",
              width: "18px",
              height: "18px",
              border: "2px solid currentColor",
              borderRadius: "50%",
              transform: "translateY(2px)",
              display: "grid",
              placeContent: "center",
              cursor: "pointer",
              ":before": {
                content: "''",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                transform: "scale(0)",
                transition: "120ms transform ease-in-out",
                boxShadow: "inset 1em 1em currentColor",
              },
              ":checked::before": {
                transform: "scale(1)",
              },
              ":focus": {
                outline: "max(2px, 1px) solid #5E9ED6",
                outlineOffset: "max(2px, 1px)",
              },
              ":disabled": {
                color: "disabled",
              },
            }}
            {...register("shipping", {
              required: true,
            })}
            type="radio"
            name="shipping"
            value={shipping.price_id}
            disabled={hasLocalOnly && !shipping.shippingLocal}
            id={slugify(shipping.name)}
          />
          <div
            sx={{
              lineHeight: "tight",
              color:
                hasLocalOnly && !shipping.shippingLocal ? "disabled" : "text",
            }}
          >
            {shipping.name} &mdash;{" "}
            {formatCurrencyString({ value: shipping.price, currency: "CAD" })}
            <br />
            <span
              sx={{
                fontSize: 0,
                color:
                  hasLocalOnly && !shipping.shippingLocal
                    ? "disabled"
                    : "textGray",
              }}
            >
              {shipping.description}
            </span>
          </div>
        </label>
      ))}
    </div>
  )
}

export default CartShipping
