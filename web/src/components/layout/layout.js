/** @jsx jsx */
import { jsx } from "theme-ui"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import SiteContainer from "./siteContainer"
import Header from "./header/header"
import Main from "./main"
import Cart from "../cart/cart"
import Footer from "./footer/footer"
import Seo from "../shared/seo"
import { CartProvider } from "use-shopping-cart"
import { useSanityMetadata } from "../../data/useSanityMetadata"

const SiteLayout = ({ children }) => {
  const { storeSettingsData } = useSanityMetadata()

  return (
    <SiteContainer>
      <Seo title="Store" />
      <CartProvider
        stripe={process.env.GATSBY_STRIPE_PUBLIC_KEY}
        cartMode="checkout-session"
        currency={storeSettingsData?.currency}
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
