/** @jsx jsx */
import { Themed, jsx } from "theme-ui"
import { useShoppingCart } from "use-shopping-cart"
import { useShipping } from "../../data/useShipping"
import { useSanityMetadata } from "../../data/useSanityMetadata"
import { formatCurrencyString } from "use-shopping-cart"
import { FiTruck, FiInfo } from "react-icons/fi"

const CartShipping = ({ register, hasLocalOnly }) => {
  const { totalPrice } = useShoppingCart()

  // Get the store settings for currency
  const { storeSettingsData } = useSanityMetadata()

  // Get the shipping options
  const shippingData = useShipping()

  const calculateShipping = () => {
    const shippingCost =
      shippingData.standardShipping.percentShipping * totalPrice
    const shippingLessThan =
      shippingCost < shippingData.standardShipping.minShipping
    const shippingGreaterThan =
      shippingCost > shippingData.standardShipping.maxShipping
    if (shippingLessThan) {
      return shippingData.standardShipping.minShipping
    }
    if (shippingGreaterThan) {
      return shippingData.standardShipping.maxShipping
    }
    return shippingCost
  }

  const isFreeShipping =
    shippingData.freeShipping.hasFreeShipping &&
    totalPrice > shippingData.freeShipping.freeShippingCutoff

  return (
    <div
      sx={{
        mb: "1.5rem",
        p: [2, 3, null, null, null],
        borderRadius: "4px",
      }}
    >
      <Themed.h2
        sx={{
          fontSize: [1, 1, 1, 1, 1],
          display: "flex",
          alignItems: "center",
          fontFamily: "body",
          fontWeight: 600,
          mt: 0,
        }}
      >
        <FiTruck sx={{ fontSize: 4, mr: 2 }} />
        Shipping options
      </Themed.h2>
      {hasLocalOnly && (
        <Themed.p
          sx={{
            color: "textError",
            display: "flex",
            alignItems: "center",
            fontSize: [1, 1, 1, 1, 1],
            mb: 0,
            mt: -2,
          }}
        >
          <FiInfo sx={{ fontSize: 1, mr: 1 }} />
          There is an item in your cart that requires local pickup.
        </Themed.p>
      )}
      <div sx={{ mt: 3 }}>
        {shippingData.localShipping.hasLocalShipping && (
          <label
            htmlFor="local-shipping"
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
              value="local-shipping"
              id="local-shipping"
            />
            <div
              sx={{
                lineHeight: "tight",
                color: "text",
              }}
            >
              {shippingData.localShipping.title}
              <br />
              <span
                sx={{
                  fontSize: 0,
                  color: "textGray",
                }}
              >
                {shippingData.localShipping.description}
              </span>
            </div>
          </label>
        )}
        {shippingData.standardShipping.hasStandardShipping && (
          <label
            htmlFor="standard-shipping"
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
              value="standard-shipping"
              disabled={hasLocalOnly}
              id="standard-shipping"
            />
            <div
              sx={{
                lineHeight: "tight",
                color: hasLocalOnly ? "disabled" : "text",
              }}
            >
              {shippingData.standardShipping.title} &mdash;{" "}
              {formatCurrencyString({
                value: calculateShipping(),
                currency: storeSettingsData.currency,
              })}
              <br />
              <span
                sx={{
                  fontSize: 0,
                  color: hasLocalOnly ? "disabled" : "textGray",
                }}
              >
                {shippingData.standardShipping.description}
              </span>
            </div>
          </label>
        )}
        {shippingData.freeShipping.hasFreeShipping && (
          <label
            htmlFor="free-shipping"
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
              value="free-shipping"
              disabled={hasLocalOnly || !isFreeShipping}
              id="free-shipping"
            />
            <div
              sx={{
                lineHeight: "tight",
                color: hasLocalOnly || !isFreeShipping ? "disabled" : "text",
              }}
            >
              {shippingData.freeShipping.title}
              <br />
              <span
                sx={{
                  fontSize: 0,
                  color:
                    hasLocalOnly || !isFreeShipping ? "disabled" : "textGray",
                }}
              >
                {shippingData.freeShipping.description}
              </span>
            </div>
          </label>
        )}
      </div>
    </div>
  )
}

export default CartShipping
