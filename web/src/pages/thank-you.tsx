/** @jsx jsx */
import { jsx } from "theme-ui"
import Seo from "../components/shared/seo"
import Layout from "../components/layout/layout"
import PageHeader from "../components/shared/pageHeader"
import CartClear from "../components/cart/cartClear"
import { useMiscData } from "../data/useMiscData"
import SanityContent from "../components/sanity/sanityContent"

const ThankYouPage = () => {
  // Get the page data
  // The unique thing about this page is the CartClear component which resets the customers cart
  const { miscData } = useMiscData()

  return (
    <Layout>
      <CartClear />
      <Seo title="Thank you" />
      <PageHeader>Thank you!</PageHeader>
      <SanityContent data={miscData._rawThankyouText} />
    </Layout>
  )
}

export default ThankYouPage
