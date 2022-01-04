# Gatsby Starter StripeMart

Like a supermarket but for Stripe. No ongoing monthly costs.

This is a _basic_ and _minimalist_ e-commerce storefront built with Gatsby, Stripe, Use-Shopping-Cart, and Netlify.

The three main features are:

- Shopping cart state management and checkout flow with Stripe and Use-Shopping-Cart
- Basic inventory management Stripe metadata and Netlify serverless functions
- Basic support for shipping options using Stripe metadata

The benefits of using this set of technologies is that there are no ongoing monthly costs - you only pay the [Stripe fees](https://stripe.com/pricing) when you actually sell something. This works well if you have a seasonal business or long periods inactivity then you won't incur any expenses.

## ⚠️ Heads up!

A few words of caution.

- If you have an active and ongoing business please use [Shopify](https://www.shopify.com/) or [Snipcart](https://snipcart.com/). They are _great_ products and are way better for most businesses, most of the time.
- This starter will never reach v1.0, it is intended as a barebones starter that you can fork and make your own! I will likely never add more significant features because there are better products for a complete e-commerce experience. You can read to [roadmap](#roadmap) below to see what is planned.

## 🧱 Tech stack

I chose this tech stack because it is one I know really well, and can move quickly in. There is no CMS on purpose, you could easily add your own if you wanted. I did add support for MDX and markdown.

- Gatsby (frontend)
- Stripe (payments)
- Use-Shopping-Cart (cart state management)
- Netlify (hosting)
- Theme-UI (styling)
- MDX/Mardown (authoring)
- React-Hook-Form (form validation)
- Framer Motion (animations)

## 🚀 Getting started

To use this starter you will need the [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/),the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and the [Stripe CLI](https://stripe.com/docs/stripe-cli).

1. `gatsby new my-store ehowey/gatsby-starter-stripemart`
2. Create a [Stripe account](https://dashboard.stripe.com/register), follow all of their prompts to get an account setup. This can take a little bit as you need to provide some personal banking information in the process.
3. Create a `.env.development` and a `.env.production` following the format in `.example.env`. You will need your Stripe Public Key and Stripe Secret Key. You should start in test mode and your keys will start with `pk_test_...` and `sk_test_...`. There is also a Stripe Webhook Secret, more on that in a moment.
4. Run `gatsby develop` - this should build successfully without any added products or shipping options.
5. Update the [Cart Provider](https://useshoppingcart.com/docs/usage/cart-provider) with the appropriate props for your business and region. You can find this in the Layout file, `src/components/layout/layout`. For those who are wondering why it is not inside `gatsby-browser` and `gatsby-ssr`, the CartProvider was conflicting with the proper creation of open graph tags by the Seo component and had to be included lower in the component layer.
6. Go back to Stripe and add a few test products. There are fallbacks for the description and image, however you should provide an image and description for your products as well as these are used in the frontend.
7. Restart `gatsby develop` and you should now see your products on the homepage. Congratulations! But you will notice that the stock just says "Checking stock..." - this is because the stock is dynamically checked every time the page loads. Let's pull in the stock.
8. Stop your development server and run `netlify dev` this will start the Netlify development server and then start Gatsby allowing the serverless functions to run as needed. You should now see the stock updated to say "1 available". If you don't specify a stock number it defaults to 1.
9. Now you need to setup the Stripe webhook to fire when a purchase has been successful(`checkout.session.completed`). The Stripe CLI lets you setup a test webhook listener with the command `stripe listen --forward-to localhost:8888/.netlify/functions/handle-purchase`. After running this command it will tell you what your webhook secret is, something like `whsec_...`. Add this to the `.env` files. Now when there is a successful purchase this serverless function will update the stock on the Stripe product.

🎉🎉Congrats! You now have a basic e-commerce store up and running use the latest and greatest in Jamstack tech!

## Stock and shipping via Stripe product metadata

_Note if there are no shipping options provided via Stripe the cart will not display any shipping options. You can skip shipping entirely if it does not apply to your business._

The only special thing to know about the creation of Stripe products is that you can add two different kinds of metadata that will be recognized by the Gatsby frontend. These are `stock` and `shipping`. All Stripe metadata is stored as a string, but stock should be a raw number and shipping is a boolean.

For example if you were creating a shipping product you might call it "Standard shipping", stock can be skipped or ignored. It won't be changed. But you do need to set a metadata called `shipping` with the value of `true`.

Try updating some of your products with a `stock` number in the metadata, and try creating some shipping options as well by setting `shipping` to true. You will notice that the cart now includes the shipping options you created in it.

## Roadmap

- Complete transition to typescript. I have made most of the important files and functions typescript however want to finish transitioning the entire repo.
- Add support for Gatsby Cloud. I was hoping to do this with Gatsby functions however they do not play nice with Stripe currently and so went back to tried-and-true Netlify functions.
