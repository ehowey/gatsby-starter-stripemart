/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
import Stripe from "stripe"
import { Handler } from "@netlify/functions"
import sanityClient from "@sanity/client"
import dollarsToCents from "dollars-to-cents"
import { validateCartItems } from "use-shopping-cart/utilities"
import { TypeCartItem } from "../../src/types/types"

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

// Function to calculate shipping cost
const calculateShipping = (items, currency, webShipping, sanityShipping) => {
  // Get the data from SANITY
  const {
    maxShipping: rawMaxShipping,
    minShipping: rawMinShipping,
    percentShipping: rawPercentShipping,
    freeShippingCutoff: rawFreeShippingCutoff,
    freeShippingTitle,
    standardShippingTitle,
    localShippingTitle,
  } = sanityShipping

  // Format the numbers from SANITY so we can use them
  const minShipping = dollarsToCents(rawMinShipping)
  const maxShipping = dollarsToCents(rawMaxShipping)
  const freeShippingCutoff = dollarsToCents(rawFreeShippingCutoff)
  const percentShipping = rawPercentShipping / 100

  // Local shipping option
  if (webShipping === "local-shipping") {
    const shipping_item = {
      price_data: {
        currency: currency,
        unit_amount: 0,
        product_data: {
          name: localShippingTitle,
          metadata: { shipping: "true" },
        },
      },
      quantity: 1,
    }
    return shipping_item
  }
  // Standard shipping
  if (webShipping === "standard-shipping") {
    // Get the total price of the items, in cents
    const totalPrice = items.reduce((acc, item) => {
      const itemTotal = item.price_data.unit_amount * item.quantity
      return acc + itemTotal
    }, 0)
    // Get the shipping price in cents
    const shippingPrice = percentShipping * totalPrice

    // Calculate the final shipping taking into account min and max amounts
    const shippingFinal = () => {
      if (shippingPrice < minShipping) {
        return minShipping
      }
      if (shippingPrice > maxShipping) {
        return maxShipping
      }
      return shippingPrice
    }
    const shipping_item = {
      price_data: {
        currency: currency,
        unit_amount: shippingFinal(),
        product_data: {
          name: standardShippingTitle,
          metadata: { shipping: "true" },
        },
      },
      quantity: 1,
    }
    return shipping_item
  }
  // Free shipping
  if (webShipping === "free-shipping") {
    // Get the total price of the items, in cents
    const totalPrice = items.reduce((acc, item) => {
      const itemTotal = item.price_data.unit_amount * item.quantity
      return acc + itemTotal
    }, 0)
    // Double check that the validated final total is greater than the free shipping total
    if (totalPrice > freeShippingCutoff) {
      const shipping_item = {
        price_data: {
          currency: currency,
          unit_amount: 0,
          product_data: {
            name: freeShippingTitle,
            metadata: { shipping: "true" },
          },
        },
        quantity: 1,
      }
      return shipping_item
    }

    // Throw an error if we did not get a valid shipping selection
    throw "Invalid shipping selection"
  }
}

const handler: Handler = async (event) => {
  try {
    // Get the items from the cart and Product Ids
    const body = JSON.parse(event.body)
    const webCartItems = body?.cart
    const webShipping = body?.shipping
    const webProductIds: Array<string> = Object.keys(webCartItems)
    const webProducts: Array<TypeCartItem> = Object.values(webCartItems)

    // Run a query against the SANITY database and get the backend data
    const query = `
      {
        "products": *[_id in $productIds]
          {
            _id,
            name,
            description,
            price,
            stock,
            "image": image.asset->url
          },
          "storeSettings": *[_type == "storeSettings"][0]
          {
            currency,
            allowedCountries,
            hasShipping,
            paymentMethodTypes,
          },
        "shipping": *[_type == "shipping"][0]
          {
            "minShipping": standardShipping.minShipping, 
            "maxShipping": standardShipping.maxShipping, 
            "percentShipping": standardShipping.percentShipping, 
            "freeShippingCutoff": freeShipping.freeShippingCutoff,
            "freeShippingTitle": freeShipping.title,
            "standardShippingTitle": standardShipping.title,
            "localShippingTitle": localShipping.title, 
        }
      }
  `
    const params = { productIds: webProductIds }
    const sanityData: any = await client.fetch(query, params)
    const sanityProducts = sanityData?.products
    const sanityShipping = sanityData?.shipping
    const sanityStoreSettings = sanityData?.storeSettings

    // Check if any item from SANITY is out of stock since this is up to date to the second
    // Return an error if out of stock
    const outOfStock = sanityProducts.some((product) => product.stock <= 0)
    if (outOfStock) {
      return {
        statusCode: 500,
        statusText: "Testing",
        body: JSON.stringify({ error: "Out of stock" }),
      }
    }

    // Check quantity purchased against available stock in SANITY
    // Return an error if insufficient stock
    const insufficientStock = webProducts.some((webProduct) => {
      const sanityProduct = sanityProducts.filter(
        (sanityProduct) => sanityProduct._id === webProduct.sanity_id
      )[0]
      const hasInsufficientStock = webProduct.quantity > sanityProduct.stock
      return hasInsufficientStock
    })
    if (insufficientStock) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Quantity selected is greater than available stock",
        }),
      }
    }

    // Format those products to check against the Cart Items from web
    const sanityFormattedProduct = sanityProducts.map((product) => {
      const formattedProduct = {
        name: product.name,
        id: product._id,
        type: "one_time",
        price: dollarsToCents(product.price),
        currency: sanityStoreSettings?.currency,
        image: product.image,
        description: product.description,
        product_data: {
          metadata: {
            sanityId: product._id,
          },
        },
      }
      return formattedProduct
    })

    // Validate the products from SANITY and the cart from the web
    const validated_items = validateCartItems(
      sanityFormattedProduct,
      webCartItems
    )

    // Deal with shipping
    if (webShipping !== null && sanityStoreSettings?.hasShipping) {
      // Calculate shipping
      const shipping_item = calculateShipping(
        validated_items,
        sanityStoreSettings?.currency,
        webShipping,
        sanityShipping
      )

      // Add shipping to our line items
      const line_items = [...validated_items, shipping_item]

      // Create the session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: sanityStoreSettings?.paymentMethodTypes,
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: sanityStoreSettings?.allowedCountries,
        },
        mode: "payment",
        success_url: `${process.env.URL}/thank-you/`,
        cancel_url: process.env.URL,
        line_items,
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id }),
      }
    }

    // Deal with orders without shipping
    if (webShipping === null && !sanityStoreSettings?.hasShipping) {
      // Line items are the same as validated items
      const line_items = validated_items

      // Create the session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: sanityStoreSettings?.paymentMethodTypes,
        billing_address_collection: "auto",
        mode: "payment",
        success_url: `${process.env.URL}/thank-you/`,
        cancel_url: process.env.URL,
        line_items,
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id }),
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Server error",
      }),
    }
  }
}

export { handler }
