/** @jsx jsx */
import { jsx } from "theme-ui"
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav"
import SiteContainer from "./siteContainer"
import Header from "./header/header"
import Main from "./main"
import Cart from "../cart/cart"
import Footer from "./footer/footer"
import Seo from "../shared/seo"

const SiteLayout = ({ children }) => {
  return (
    <SiteContainer>
      <Seo title="Store" />
      <SkipNavLink />
      <Header />
      <Main>
        <SkipNavContent />
        {children}
      </Main>
      <Cart />
      <Footer />
    </SiteContainer>
  )
}

export default SiteLayout
