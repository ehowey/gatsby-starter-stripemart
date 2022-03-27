import React from "react"
import { CartProvider } from "use-shopping-cart"

export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider
      stripe={process.env.GATSBY_STRIPE_PUBLIC_KEY}
      cartMode="checkout-session"
    >
      {element}
    </CartProvider>
  )
}
