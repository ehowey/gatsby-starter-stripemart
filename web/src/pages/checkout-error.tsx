/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import Seo from "../components/shared/seo"
import Layout from "../components/layout/layout"
import PageHeader from "../components/shared/pageHeader"
import { useMiscData } from "../data/useMiscData"
import SanityContent from "../components/sanity/sanityContent"
import { FiAlertTriangle } from "react-icons/fi"

const ThankYouPage = ({ location }) => {
  // // Get the page data
  // // The unique thing about this page is the CartClear component which resets the customers cart
  const { miscData } = useMiscData()

  const hasError = location?.state?.error != null
  const error = location?.state?.error

  return (
    <Layout>
      <Seo title="Checkout error" />
      <PageHeader>Checkout error</PageHeader>
      {hasError && (
        <div
          sx={{
            bg: "backgroundError",
            color: "textError",
            p: 3,
            borderRadius: "4px",
            mb: 3,
          }}
        >
          <Themed.p sx={{ m: 0, display: "flex", alignItems: "center" }}>
            <FiAlertTriangle sx={{ mr: 2 }} />
            {error}
          </Themed.p>
        </div>
      )}
      <SanityContent data={miscData._rawErrorText} />
    </Layout>
  )
}

export default ThankYouPage
