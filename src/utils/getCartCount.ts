// Because the cart count will include shipping items we need to filter those out.
import { CartDetails } from "use-shopping-cart"

export const getCartCount = (cartDetails: CartDetails): number => {
  const cartFiltered: Array<any> = Object.values(cartDetails).filter(
    (product) => product.shipping !== true
  )

  const cartCount: number = cartFiltered.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  )

  return cartCount
}
