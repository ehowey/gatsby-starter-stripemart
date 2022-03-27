import Stripe from "stripe"
import { Handler } from "@netlify/functions"
import sanityClient from "@sanity/client"

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})
// Initialize SANITY client
const client = sanityClient({
  projectId: process.env.GATSBY_SANITY_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2022-02-01",
})

const handler: Handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === "checkout.session.completed") {
      // Get the session from the webhook and then
      // Got Stripe to get all of the session data
      // We need the full line items from the completed purchase
      const eventObject: any = stripeEvent.data.object
      const sessionId: string = eventObject.id
      const sessionData: any = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ["line_items", "line_items.data.price.product"],
        }
      )
      const lineItems: any = sessionData.line_items.data

      const buildPatches = (items) =>
        items
          .filter((item) => item.price.product.metadata.shipping !== "true")
          .map((item) => ({
            id: item.price.product.metadata.sanityId,
            patch: {
              dec: { stock: item.quantity },
            },
          }))

      const createTransaction = (patches) =>
        patches.reduce(
          (tx, patch) => tx.patch(patch.id, patch.patch),
          client.transaction()
        )

      const commitTransaction = (tx) =>
        tx
          .commit()
          .then(() => {
            console.log("Update successful")
          })
          .catch((err) => {
            console.error("Oh no, the update failed: ", err.message)
          })

      const updateSanity = async () => {
        const patches = buildPatches(lineItems)
        const transaction = createTransaction(patches)
        await commitTransaction(transaction)
      }

      await updateSanity()
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
