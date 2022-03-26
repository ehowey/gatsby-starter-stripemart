/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fragment } from "react"
import { useSanityMetadata } from "../../data/useSanityMetadata"
import AlertBanner from "./alertBanner"

const SiteContainer = ({ children }) => {
  const { alertBannerData } = useSanityMetadata()
  const displayAlertBanner = alertBannerData?.displayAlertBanner
  return (
    <Fragment>
      {displayAlertBanner && <AlertBanner />}
      <div
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          backgroundPosition: [
            "70px -20px",
            "70px -50px",
            "90px -140px",
            "160px -50px",
            null,
          ],
          backgroundRepeat: "no-repeat",
          gridTemplateAreas: `
        "header" 
        "main"
        "footer"
        `,
        }}
      >
        {children}
      </div>
    </Fragment>
  )
}

export default SiteContainer
