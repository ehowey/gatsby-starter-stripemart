/** @jsx jsx */
import { useShoppingCart } from "use-shopping-cart"
import { useEffect } from "react"

const ClearCart = () => {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  }, []) //eslint-disable-line

  return null
}

export default ClearCart
