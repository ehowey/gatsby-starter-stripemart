# 🏪 Gatsby Starter Stripemart

Like a supermarket but for Stripe.

No ongoing monthly costs. Perfect for artists, creators and independent builders doing the side hustle shuffle!

This is a _basic_ and _minimalist_ e-commerce storefront built with [Gatsby](https://www.gatsbyjs.com/), [SANITY](https://www.sanity.io/), [Stripe](https://stripe.com), [Use-Shopping-Cart](https://useshoppingcart.com/), and [Netlify](https://www.netlify.com/).

The main features are:

- 🔥 Blazing fast frontend with Gatsby
- 📦 Product and inventory management with SANITY
- 🔒 Secure payments and cart validation with Stripe
- 💽 Serverless Jamstack architecture with Netlify
- 🛒 Shopping cart state management with Use-Shopping-Cart

Some nice-to-haves:

- 🚚 Optional support for basic shipping calculations
- 🎁 Optional support for add ons (e.g. wrapping paper) in the checkout flow
- 📍 Optional support for free local pickup
- 💸 Optional support for free shipping

The benefits of using this set of technologies together is that there are no ongoing monthly costs - you only pay the [Stripe processing fees](https://stripe.com/pricing) when you actually sell something.

## Demo

- [https://gatsby-starter-stripemart.netlify.app/](https://gatsby-starter-stripemart.netlify.app/) - Basic demo without any extras, only uses test keys.
- [https://www.westwindwool.com/](https://www.westwindwool.com/) - Real working e-commerce storefront (and why I built this to begin with), shows off all the shipping options and add on items in the cart.

## ⚠️ Heads up!

A few words of caution. If you have an active and ongoing business you should probably _not_ use this starter!

- Please consider using [Shopify](https://www.shopify.com/) or [Snipcart](https://snipcart.com/). They are _great_ products and are way better for most businesses, most of the time. They have whole teams of security and performance experts. Amazing integrations. I am one developer only.
- This starter will never reach v1.0, it is intended as a barebones starter that you can fork and make your own! I will likely never add more significant features because there are better products for a complete e-commerce experience. You can read the [roadmap](#roadmap) below to see what is planned however.
- The intended audience is other developers with some prior experience with Jamstack technologies

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

To use this starter properly you will need the [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/), the [SANITY CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli), the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and the [Stripe CLI](https://stripe.com/docs/stripe-cli).

You will need to create or already have a Stripe account, a SANITY account, and a Netlify account.

I assume you are somewhat familiar with Jamstack/modern frontend web development in this getting started guide. Having said that, please don't hesistate to reach out if you have a question or a step is too vague.

1. [Use this template](https://github.com/ehowey/gatsby-starter-stripemart/generate) to create a fresh copy of these files into your own GitHub account. Clone and download the files to start working locally.
2. Run `yarn install` or `npm install` in the `/web` and `/studio` folders. The web folder is your Gatsby frontend. The studio folder is your SANITY backend.
3. Create a `.env.development` and a `.env.production` following the format in `.example.env`. We will add the information we need in a bit.
4. Inside of `/studio` run `sanity init` to initialize a new database for the store. You can use the default options.
5. Type `sanity manage` to open your project's management console, then go to Settings > API > Tokens, and use the Add new token button to open the token creation dialog. You need a token with read + write privileges. Copy and paste this into your `.env` files. While you are here add `http://localhost:8888` to your CORS origins with credentials.
6. You will also need the `projectId` and `dataset` which can be found in `/studio/sanity.json`. Copy and paste these into your `.env` files.
7. To make life easier you can import some basic starting data. Run this command to seed some basic data into the database, `cd data sanity dataset import production.tar.gz`.
8. You will need to deploy the graphql data layer for Gatsby, run `sanity graphql deploy` inside of the `/studio` directory.
9. Now we need to hop over to Stripe and get your secret key and public key. You should be using test keys which start with `sk_test_...` and `pk_test_...`. You can read more about [Stripe Api Keys](https://stripe.com/docs/keys). Copy and paste these into your `.env` files as well.
10. Whew! Almost there! Run `netlify dev` to start the Netlify development server (which will also compile Gatsby). If you have done everything right you should see your glorious new store on `http://localhost:8888`!
11. Last step! Now you need to setup a local Stripe webhook to fire when a purchase has been successful(`checkout.session.completed`). The Stripe CLI lets you setup a test webhook listener with the command `stripe listen --forward-to localhost:8888/.netlify/functions/handle-purchase`. After running this command it will tell you what your webhook secret is, something like `whsec_...`. Add this to the `.env` files. Now when there is a successful purchase this serverless function will update the stock on the SANITY backend.

🎉🎉Congrats! You now have a basic e-commerce store up and running using the latest and greatest in Jamstack tech! Deploy that greatness!

## Deployment

- Double check CORS origins when you deploy, you will likely need to make sure they are setup correctly
- You will need to set a live webhook endpoint for the `handle-purchase` function
- Don't forget to set all those `.env` variables correctly in Netlify
- If you want to auto-publish from SANITY to Netlify you can use a webhook for this
- Stripe webhook secrets for production are going to be different than what you are running locally when testing, make sure you update them!
- Keep those API keys safe! Make sure you don't check those into git.

## Cart validation and security

The main cart validation is handled on the backend by Stripe. All payments are handled securely by Stripe. If the product price passed from the frontend to Stripe and the price listed in the backend with SANITY do not match then the transaction will not be approved. There are some other basic checks that also happen before a purchase is completed, e.g. is there enough stock, is the shipping calculated correctly, is shipping actually enabled.

I have also included some basic validation on the frontend, e.g. if you select a stock of "-5" if will show an error. It also checks the stock number against the quantity selected, try selecting a quantity above the current listed stock and you will also see an error.

Most of this happens in `web/netlify/functions/handle-checkout.ts` and `web/netlify/functions/handle-purchase.ts` which are Netlify serverless functions.

## Store settings

The following store settings area available in Site Settings > Store Settings. These allow for configuration of some Stripe settings. If you want to manually update the Stripe checkout settings see the file in `web/netlify/functions/handle-checkout.ts`.

- Currency: String. Should be a three-letter currency code, e.g. `USD` or `CAD`. See https://stripe.com/docs/currencies for details.
- Payment Method Types: An array of payment types, at a minimum select 'card' for most major credit cards. See https://stripe.com/docs/payments/payment-methods/integration-options for all payment method types.
- Support add ons: Boolean to toggle the add on section in the checkout
- Support shipping: Boolean to toggle shipping in the checkout
- Allowed Countries: An array of strings for the allowed countries for shipping. For example 'US' or 'GB'. See https://stripe.com/docs/payments/checkout/shipping for details.

## Shipping

Shipping is optional and can be toggled off in the store settings, see above.

There are three different types of shipping available, all of them are optional. Local pickup, Standard shipping, and Free shipping. Each can be toggled on and off if you don't want to offer a local pickup option for example.

Local shipping and free shipping are pretty straightforward. Note the cutoff amount for the free shipping can be set to whatever value you want.

Standard shipping is calculated using a formula. You set a shipping percentage, a minimum amount, and a maximum amount. This is then used to calculate the shipping presented to the customer, and validated again server side.

So for example imagine you set the following values:

- Shipping percent: 20%
- Minimum shipping: $5.00
- Maximum shipping: $20.00

If you had a $15.00 item shipping should be calculated as the minimum value of $5.00. If the item was $45.00 the shipping would be calculated using the percentage as $9.00. If the item was $180.00 the maximum shipping amount would be charged of $20.00.

This formula isn't perfect, but it isn't trying to be either 🤷. This gives some flexibility in shipping charged with minimal work on your part. If you need perfectly calculated shipping fees your probably need a more formal e-commerce product, see the warning above.

## Add ons

Add ons are optional and can be toggled off in the store settings, see above.

This allows you to add an item that is available for purchase in the checkout cart, for example giftwrap or some kind of other small item a customer may want to add onto their order. These add on items are functionally the same as all other products, but they are _not_ shown in the store, only in the add ons area of the checkout.

## Styling with Theme-UI

[Theme-UI](https://theme-ui.com/) is a css-in-js library with a constraints based design system. You can find the main theme file in `src/styles/theme.js`. Try changing around some of the colors and you will see how quickly you can customize the look and feel of the site.

Theme-UI is based on [Emotion](https://emotion.sh/) and is very similar to Chakra-UI if you are familiar with that library.

## Roadmap

- Check stock on last time on payment_intent_created. Right now stock is checked on the frontend, and checked serverside before reaching checkout, but it would be good to check it again one last time just before payment goes through.
- Complete transition to typescript. I have made most of the important files and functions typescript however want to finish transitioning the entire repo and fix some of the places I cheated with `:any`.
- Maybe add a search function
- Better form inputs in SANITY for currencies, right now they are just number or integer inputs. It would be nice if these showed a dollar sign and proper punctuation.
- Any and all a11y improvements!
- Maybe some tests with Cypress, this is a bit of a stretch goal, but something I might do if there is some momentum with the project.
- Add support for Gatsby Cloud. I was hoping to do this with Gatsby functions however they do not play nice with Stripe currently and so went back to tried-and-true Netlify functions.

## Contribution.

All contribution is welcome however I have no plans to add major features to this starter other than those mentioned above in the roadmap. Would love some help to improve TS and any a11y improvements!
