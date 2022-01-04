import Stripe from "stripe"
import { Handler } from "@netlify/functions"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

// Handle updating the stock based on the purchased product
const handleStockUpdate = async (item): Promise<void> => {
  const productId = item.price.product.id
  const retrievedProduct = await stripe.products.retrieve(productId)
  const stockAsInt = parseInt(retrievedProduct.metadata.stock) - 1
  const updatedStock = stockAsInt >= 1 ? stockAsInt : 0
  const isProductActive = stockAsInt >= 1
  const currentStockAsString = updatedStock.toString()
  const updatedProduct = await stripe.products.update(productId, {
    metadata: { stock: currentStockAsString },
    active: isProductActive,
  })
}

const handler: Handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "checkout.session.completed") {
      const eventObject: any = stripeEvent.data.object
      const id: string = eventObject.id
      const session: any = await stripe.checkout.sessions.retrieve(id, {
        expand: ["line_items", "line_items.data.price.product"],
      })
      const lineItems: any = session.line_items.data
      lineItems.map((item) => handleStockUpdate(item))
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    }
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`)

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
}

export { handler }
