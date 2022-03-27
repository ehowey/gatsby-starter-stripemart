import React from "react"
import { CartProvider } from "use-shopping-cart"
import "./src/styles/global.css"

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector("#reach-skip-nav")
    if (skipLink) {
      skipLink.focus()
    }
  }
}

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
