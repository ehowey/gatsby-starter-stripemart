/** @jsx jsx */
import { jsx, Themed, Button } from "theme-ui"
import { navigate } from "gatsby"
import { useShoppingCart } from "use-shopping-cart"
import { FiLoader } from "react-icons/fi"
import { useShipping } from "../../data/useShipping"
import { useAddOns } from "../../data/useAddOns"
import { useSanityMetadata } from "../../data/useSanityMetadata"
import { useWatch, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import CartAddOns from "./cartAddOns"
import CartShipping from "./cartShipping"
import CartItem from "./cartItem"
import { TypeCartItem } from "../../types/types"

const CartForm = () => {
  // Track whether checkout has been clicked
  const [clickedCheckout, setClickedCheckout] = useState(false)

  // Get the required functions from USC
  const {
    redirectToCheckout,
    clearCart,
    cartDetails,
    addItem,
    removeItem,
    cartCount,
  } = useShoppingCart()

  // CartItems as an array
  const cartArray: Array<TypeCartItem> = Object.values(cartDetails)

  const shippingData = useShipping()

  // Get all the add ons
  const addOns = useAddOns()

  // Get the store settings
  const { storeSettingsData } = useSanityMetadata()

  // Check that there are shipping options
  const hasShipping = storeSettingsData.hasShipping

  const hasLocalShipping = shippingData.localShipping.hasLocalShipping

  const hasStandardShipping = shippingData.standardShipping.hasStandardShipping

  // Check that there are add ons
  const hasAddOns = storeSettingsData.hasAddOns

  // Check if there are any localOnly products
  const hasLocalOnly = cartArray.some((product) => product.localOnly === true)

  // Get any already selected add ons
  const selectedAddOns = cartArray.filter((product) => product.addOn === true)

  // Extract ids for react-hook-form
  const addOnIds = selectedAddOns.reduce((acc, cur, i) => {
    acc[cur.price_id] = true
    return acc
  }, {})

  // Setup the form for the cart
  const {
    handleSubmit,
    register,
    control,
    clearErrors,
    reset,
    trigger,
    setValue,
    setError,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      shipping: hasLocalShipping
        ? "local-shipping"
        : hasStandardShipping
        ? "standard-shipping"
        : null,
      addOns: addOnIds,
    },
  })

  // Force revalidation when the form opens
  // Reset clicked checkout state
  useEffect(() => {
    setClickedCheckout(false)
    trigger()
  }, []) //eslint-disable-line

  const watchedAddOns = useWatch({
    control,
    name: "addOns",
  })

  // Handle adding and removing add on items
  useEffect(() => {
    // Code only runs if there is actually add ons options
    if (watchedAddOns) {
      const price_ids = Object.keys(watchedAddOns)

      // Loop over each add on
      price_ids.forEach((price_id) => {
        // Get the full product details
        const addOnSelection = addOns.filter(
          (addOn) => addOn.price_id === price_id
        )[0]

        // Check if it is in the cart already
        const inCart = cartArray.some(
          (product) => product.price_id === addOnSelection.price_id
        )

        // Also have to check if its watched value is false
        const unChecked = watchedAddOns[price_id] === false

        // Remove it if it is in the cart and unchecked
        if (inCart && unChecked) {
          removeItem(addOnSelection.price_id)
        }

        // Add it if it is not in the cart and checked
        if (!inCart && !unChecked) {
          addItem(addOnSelection)
        }
      })
    }
  }, [watchedAddOns]) //eslint-disable-line

  // Function for what happens after submit of the form.
  // Needs to split into a seperate function call as RHF
  // does form validation before sending it to handleCheckout
  const onSubmit = (formData) => handleCheckout(formData)

  // Clear the cart
  const handleClearCart = () => {
    clearCart()
    // reset({ addOns: null, shipping: null })
    reset()
    setError("shipping", {
      type: "required",
      message: "",
    })
  }

  // Handles sending checkout to serverless function
  // Note this relies on data from the cart and not form
  const handleCheckout = async (formData: any) => {
    const selectedShipping = formData?.shipping
    setClickedCheckout(true)
    const response = await fetch("/.netlify/functions/handle-checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cartDetails, shipping: selectedShipping }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        } else if (response.status === 400 || response.status === 500) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((responseJson) => {
        if (responseJson.sessionId != null) {
          redirectToCheckout({ sessionId: responseJson.sessionId })
        } else if (responseJson.error != null) {
          navigate("/checkout-error/", {
            state: { error: responseJson.error },
          })
        } else {
          navigate("/checkout-error/", {
            state: { error: "Unknown checkout error" },
          })
        }
      })
      .catch((error) => {
        console.log(error)
        navigate("/checkout-error/", {
          state: { error: "Unknown checkout error" },
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} sx={{ position: "relative" }}>
      <div sx={{ px: [2, 3, null, null, null] }}>
        {cartCount > 0 ? (
          <ul
            sx={{
              mt: 0,
              mb: "1.5rem",
              listStyle: "none",
              p: 0,
              mx: 0,
            }}
          >
            {cartArray
              .filter((product) => product.shippingOption !== true)
              .map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  register={register}
                  control={control}
                  clearErrors={clearErrors}
                  setValue={setValue}
                />
              ))}
          </ul>
        ) : (
          <Themed.p
            sx={{ fontSize: [1, 1, 1, 1, 1], px: [2, 3, null, null, null] }}
          >
            Looks like your cart is empty! Take a look around and enjoy
            something fun!
          </Themed.p>
        )}
      </div>
      {hasAddOns && (
        <div sx={{ px: [2, 3, null, null, null], mb: "1.5rem" }}>
          <CartAddOns register={register} />
        </div>
      )}
      {hasShipping && (
        <div sx={{ px: [2, 3, null, null, null] }}>
          <CartShipping register={register} hasLocalOnly={hasLocalOnly} />
        </div>
      )}
      <div sx={{ display: "flex", px: [3, 4, null, null, null] }}>
        <Button
          type="submit"
          disabled={!isValid || clickedCheckout || cartCount === 0}
          sx={{
            width: "120px",
            display: "grid",
            placeItems: "center",
            mr: 3,
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
                fontSize: 3,
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
