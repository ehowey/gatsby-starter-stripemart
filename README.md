# 🏪 Gatsby Starter Stripemart

Like a supermarket but for Stripe.

No ongoing monthly costs.

This is a _basic_ and _minimalist_ e-commerce storefront built with [Gatsby](https://www.gatsbyjs.com/), [SANITY](https://www.sanity.io/), [Stripe](https://stripe.com), [Use-Shopping-Cart](https://useshoppingcart.com/), and [Netlify](https://www.netlify.com/).

The main features are:

- 🔥 Blazing fast frontend with Gatsby
- 📦 Product management and headless CMS via SANITY
- 🔒 Secure payments and cart validation via Stripe
- 💽 Serverless Jamstack architecture with Netlify serverless functions
- 🛒 Shopping cart state management and checkout flow with Use-Shopping-Cart
- 🚚 Optional support for basic shipping calculations

The benefits of using this set of technologies is that there are no ongoing monthly costs - you only pay the [Stripe fees](https://stripe.com/pricing) when you actually sell something. This works well if you have a seasonal business or periods inactivity.

## Demo

[https://gatsby-starter-stripemart.netlify.app/](https://gatsby-starter-stripemart.netlify.app/)

## ⚠️ Heads up!

A few words of caution.

- If you have an active and ongoing business please use [Shopify](https://www.shopify.com/) or [Snipcart](https://snipcart.com/). They are _great_ products and are way better for most businesses, most of the time.
- This starter will never reach v1.0, it is intended as a barebones starter that you can fork and make your own! I will likely never add more significant features because there are better products for a complete e-commerce experience. You can read the [roadmap](#roadmap) below to see what is planned.
- The getting started guide below assumes you have some familiarity with Jamstack and modern web development practices.

## 🧱 Tech stack

I chose this tech stack because it is one I know really well, and am confident in.

- Gatsby (frontend), `/web`
- SANITY (backend), `/studio`
- Stripe (payments)
- Use-Shopping-Cart (cart state management)
- Netlify (hosting)
- Theme-UI (styling)
- React-Hook-Form (form validation)
- Reach-UI for a11y cart modal
- Framer Motion (animations)

## 🚀 Getting started

To use this starter properly you will need the [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/),the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and the [Stripe CLI](https://stripe.com/docs/stripe-cli).

1. `gatsby new my-store ehowey/gatsby-starter-stripemart`
2. Create a [Stripe account](https://dashboard.stripe.com/register), follow all of their prompts to get an account setup. This can take a little bit as you need to provide some personal banking information in the process.
3. Create a `.env.development` and a `.env.production` following the format in `.example.env`. You will need your Stripe Public Key and Stripe Secret Key. You should start in test mode and your keys will start with `pk_test_...` and `sk_test_...`. There is also a Stripe Webhook Secret, more on that in a moment.
4. Run `gatsby develop` - this should build successfully without any added products or shipping options.
5. Update the [Cart Provider](https://useshoppingcart.com/docs/usage/cart-provider) with the appropriate props for your business and region. You can find this in the Layout file, `src/components/layout/layout`. For those who are wondering why it is not inside `gatsby-browser` and `gatsby-ssr`, the CartProvider was conflicting with the proper creation of open graph tags by the Seo component and had to be included lower in the component layer.
6. Go back to Stripe and add a few test products. There are fallbacks for the description and image, however you should provide an image and description for your products as well as these are used in the frontend.
7. Restart `gatsby develop` and you should now see your products on the homepage. Congratulations! But you will notice that the stock just says "Checking stock..." - this is because the stock is dynamically checked every time the page loads. Let's pull in the stock.
8. Stop your development server and run `netlify dev` this will start the Netlify development server and then start Gatsby allowing the serverless functions to run as needed. You should now see the stock updated to say "1 available". If you don't specify a stock number it defaults to 1.
9. Now you need to setup the Stripe webhook to fire when a purchase has been successful(`checkout.session.completed`). The Stripe CLI lets you setup a test webhook listener with the command `stripe listen --forward-to localhost:8888/.netlify/functions/handle-purchase`. After running this command it will tell you what your webhook secret is, something like `whsec_...`. Add this to the `.env` files. Now when there is a successful purchase this serverless function will update the stock on the Stripe product.
10. Stripe has a number of different outgoing webhook options, you can set it to rebuild your site via a webhook to Netlify(or other hosts) whenever a product is added, updated or deleted.

🎉🎉Congrats! You now have a basic e-commerce store up and running using the latest and greatest in Jamstack tech! Deploy that greatness!

## Cart validation and security

The main cart validation is handled on the backend by Stripe. All payments are handled securely by Stripe. If the product price passed from the frontend to Stripe and the price listed in the backend with SANITY do not match then the transaction will not be approved. There are some other basic checks that also happen before a purchase is completed, e.g. is there enough stock, is the shipping calculated correctly.

I have also included some basic validation on the frontend, e.g. if you select a stock of "-5" if will show an error. It also checks the stock number against the quantity selected, try selecting a quantity above the current listed stock and you will also see an error.

## Styling with Theme-UI

[Theme-UI](https://theme-ui.com/) is a css-in-js library with a constraints based design system. You can find the main theme file in `src/styles/theme.js`. Try changing around some of the colors and you will see how quickly you can customize the look and feel of the site.

Theme-UI is based on [Emotion](https://emotion.sh/) and is very similar to Chakra-UI if you are familiar with that library.

## Gotchas

- CORS in SANITY

## Roadmap

- Complete transition to typescript. I have made most of the important files and functions typescript however want to finish transitioning the entire repo.
- Better form inputs in SANITY
- Any and all a11y improvements!
- Add support for Gatsby Cloud. I was hoping to do this with Gatsby functions however they do not play nice with Stripe currently and so went back to tried-and-true Netlify functions.

## Contribution.

All contribution is welcome however I have no plans to add features to this starter other than those mentioned above in the roadmap. Would love some help to improve TS and any a11y improvements!
