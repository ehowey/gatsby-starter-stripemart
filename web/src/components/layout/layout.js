/** @jsx jsx */
import { jsx } from "theme-ui"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import SiteContainer from "./siteContainer"
import Header from "./header/header"
import Main from "./main"
import Cart from "../cart/cart"
import Footer from "./footer/footer"
import { CartProvider } from "use-shopping-cart"
import Seo from "../shared/seo"

const SiteLayout = ({ children }) => {
  return (
    <SiteContainer>
      <Seo title="Store" />
      <CartProvider
        stripe={process.env.GATSBY_STRIPE_PUBLIC_KEY}
        cartMode="checkout-session"
        successUrl="https://gatsby-starter-stripemart.netlify.app/thank-you"
        cancelUrl="https://gatsby-starter-stripemart.netlify.app/"
        currency="CAD"
        allowedCountries={["CA"]}
        billingAddressCollection={"auto"}
      >
        <SkipNavLink />
        <Header />
        <Main>
          <SkipNavContent />
          {children}
        </Main>
        <Cart />
        <Footer />
      </CartProvider>
    </SiteContainer>
  )
}

export default SiteLayout
