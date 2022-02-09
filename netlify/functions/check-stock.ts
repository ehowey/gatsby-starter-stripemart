import Stripe from "stripe"
import { Handler } from "@netlify/functions"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

const handler: Handler = async (event, context) => {
  const priceId: string = event.queryStringParameters.priceId

  let stock: number
  try {
    const retrievedPrice: any = await stripe.prices.retrieve(priceId)
    const productId: string = retrievedPrice.product
    const retrievedProduct: any = await stripe.products.retrieve(productId)
    const currentStock: number = parseInt(retrievedProduct?.metadata?.stock)
    const active = retrievedProduct?.active
    stock = active ? (currentStock >= 0 ? currentStock : 1) : 0
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      stock: stock,
    }),
  }
}

export { handler }
