/** @jsx jsx */
import { jsx } from "theme-ui"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import SiteContainer from "./siteContainer"
import Header from "./header/header"
import Main from "./main"
import CartModal from "../store/cartModal"
import Footer from "./footer/footer"
import { CartProvider } from "use-shopping-cart"
import Seo from "../shared/seo"

const SiteLayout = ({ children }) => {
  return (
    <SiteContainer>
      <Seo title="Store" />
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.GATSBY_STRIPE_PUBLIC_KEY}
        successUrl="https://www.erichowey.dev"
        cancelUrl="https://twitter.com/erchwy"
        currency="USD"
        allowedCountries={["CA", "US", "GB"]}
        billingAddressCollection={true}
      >
        <SkipNavLink />
        <Header />
        <Main>
          <SkipNavContent />
          {children}
        </Main>
        <CartModal />
        <Footer />
      </CartProvider>
    </SiteContainer>
  )
}

export default SiteLayout
