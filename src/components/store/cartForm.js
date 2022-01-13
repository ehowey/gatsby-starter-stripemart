/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { useShoppingCart } from "use-shopping-cart/react"
import CartItem from "./cartItem"
import { FiLoader } from "react-icons/fi"
import CartShipping from "./cartShipping"
import { getCartCount } from "../../utils/getCartCount"
import { useStripeShipping } from "../../data/useStripeShipping"
import { useWatch, useForm } from "react-hook-form"
import { useEffect, useState } from "react"

const CartForm = () => {
  // Get the required functions from USC
  const {
    redirectToCheckout,
    clearCart,
    cartDetails,
    handleCloseCart,
    addItem,
    removeItem,
  } = useShoppingCart()

  // Get the shipping options
  const shippingOptions = useStripeShipping()

  // Check that there are shipping options
  const hasShipping = shippingOptions.length > 0

  // Get the cart count without shipping options
  const cartCount = getCartCount(cartDetails)

  // Check if they already have a shipping option
  const selectedShipping = Object.values(cartDetails).filter(
    (product) => product.shippingOption === true
  )

  // Check if there are any localOnly products
  const hasLocalOnly = Object.values(cartDetails).some(
    (product) => product.localOnly === true
  )

  console.log(hasLocalOnly)

  // Get the initial shipping id. If there is one in the cart use that.
  const selectedShippingId =
    selectedShipping.length > 0
      ? selectedShipping[0].price_id
      : hasShipping
      ? shippingOptions[0].price_id
      : null

  // Track whether checkout has been clicked
  const [clickedCheckout, setClickedCheckout] = useState(false)

  // Setup the form for the cart
  const {
    handleSubmit,
    register,
    control,
    clearErrors,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      shipping: selectedShippingId,
    },
  })

  // Function for what happens after submit of the form.
  // Needs to split into a seperate function call as RHF
  // does form validation before sending it to handleCheckout
  const onSubmit = () => handleCheckout()

  // Clear the cart
  const handleClearCart = () => {
    clearCart()
    reset()
  }

  // Handle clicking the checkout button, using a timeout to reset it after 5 seconds
  const handleCheckout = () => {
    setClickedCheckout(true)
    setTimeout(() => {
      setClickedCheckout(false)
      clearCart()
      handleCloseCart()
    }, 6000)
    redirectToCheckout()
  }

  // Watch any chances to shipping selection
  const shippingId = useWatch({
    control,
    name: "shipping",
    defaultValue: selectedShippingId, // default value before the render
  })

  // Handle adding and removing shipping items
  useEffect(() => {
    // Code only runs if there is actually shipping options
    if (hasShipping) {
      // If there is no current shipping rate, just add it
      const shippingSelection = shippingOptions.filter(
        (shipping) => shipping.price_id === shippingId
      )
      const shippingInCart = Object.values(cartDetails).filter(
        (product) => product.shippingOption === true
      )

      // If there is no shipping just add it
      if (shippingInCart.length === 0) {
        addItem(shippingSelection[0])
      }

      // If there is a shipping, switch them
      if (shippingInCart.length === 1) {
        removeItem(shippingInCart[0].price_id)
        addItem(shippingSelection[0])
      }
    }
  }, [shippingId]) //eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {cartCount > 0 ? (
        <div>
          <ul
            sx={{
              mt: 3,
              mb: [4, null, 5, null, null],
              listStyle: "none",
              p: 0,
              mx: 0,
            }}
          >
            {Object.values(cartDetails)
              .filter((product) => product.shippingOption !== true)
              .map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  register={register}
                  control={control}
                  clearErrors={clearErrors}
                />
              ))}
          </ul>
        </div>
      ) : (
        <Themed.p sx={{ fontSize: 1 }}>
          Looks like your cart is empty! Take a look around and enjoy something
          fun!
        </Themed.p>
      )}
      {hasShipping && (
        <CartShipping register={register} hasLocalOnly={hasLocalOnly} />
      )}{" "}
      <div sx={{ display: "flex", gap: 3 }}>
        <Button
          type="submit"
          disabled={!isValid || clickedCheckout || cartCount === 0}
          sx={{
            width: "120px",
            display: "grid",
            placeItems: "center",
            ":disabled": {
              opacity: 0.5,
              cursor: "default",
            },
            ":disabled:hover, :disabled:active, :disabled:focus": {
              bg: "primary",
            },
          }}
        >
          {clickedCheckout ? (
            <FiLoader
              sx={{
                fontSize: 2,
                animation: "spin infinite 5s linear",
                "@keyframes spin": {
                  from: {
                    transform: "rotate(0deg)",
                  },
                  to: {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            />
          ) : (
            `Checkout`
          )}
        </Button>
        <Button
          type="reset"
          onClick={handleClearCart}
          variant="secondary"
          sx={{ fontWeight: "normal", width: "120px" }}
        >
          Clear cart
        </Button>
      </div>
    </form>
  )
}

export default CartForm
