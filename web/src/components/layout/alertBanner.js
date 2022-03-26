/** @jsx jsx */
import { jsx, Button, Themed } from "theme-ui"
import { useEffect, useState } from "react"
import { FiInfo } from "react-icons/fi"
import { FiX } from "react-icons/fi"
import { useSanityMetadata } from "../../data/useSanityMetadata"

const AlertBanner = () => {
  // Get the Alert Banner Data
  const { alertBannerData } = useSanityMetadata()

  // State for alert Banner
  const [displayAlert, setDisplayAlert] = useState(null)

  //Close alert banner and set session storage to remember this
  const handleClose = () => {
    setDisplayAlert(false)
    const sessionStorage = window.sessionStorage
    sessionStorage.setItem("displayAlertBanner", false)
  }

  // On load check session storage to see if display alert banner is false, otherwise set to true
  useEffect(() => {
    const sessionStorage = window.sessionStorage
    let displayAlertBanner = sessionStorage.getItem("displayAlertBanner")
    if (displayAlertBanner === "false") {
      setDisplayAlert(false)
    } else {
      setDisplayAlert(true)
    }
  }, []) //eslint-disable-line

  if (!displayAlert) {
    return null
  } else {
    return (
      <div
        role="alertdialog"
        aria-label="Sitewide alert"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bg: "alert.background",
          color: "text",
          pl: 3,
          pr: 1,
          py: [0, 1, null, null, null],
        }}
      >
        <div sx={{ display: "flex", alignItems: "center" }}>
          <FiInfo
            sx={{
              mr: 2,
              flexShrink: "0",
              fontSize: [2, null, 3, null, null],
            }}
          />
          <div
            sx={{
              mx: 3,
            }}
          >
            <Themed.p
              sx={{
                my: 2,
                color: "alert.text",
                lineHeight: "tight",
                fontSize: [1, null, 2, null, null],
              }}
            >
              {alertBannerData.text}
            </Themed.p>
          </div>
        </div>
        <Button
          onClick={handleClose}
          aria-label="Close alert"
          sx={{
            flexShrink: "0",
            bg: "transparent",
            color: "alert.text",
            fontSize: 3,
            borderWidth: "0px",
            borderColor: "text",
            borderStyle: "none",
            borderRadius: "9999em",
            p: 0,
            mx: 1,
            width: "28px",
            height: "28px",
            display: "grid",
            placeItems: "center",
            boxShadow: "none",
            transition: "all 0.3s ease-in-out",
            ":hover, :active, :focus": {
              bg: "orange.6",
            },
          }}
        >
          <FiX />
        </Button>
      </div>
    )
  }
}

export default AlertBanner
