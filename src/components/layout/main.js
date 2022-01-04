/** @jsx jsx */
import { jsx } from "theme-ui"

const SiteMain = ({ children }) => {
  return (
    <main
      sx={{
        gridArea: "main",
        maxWidth: "maxContentWidth",
        width: "100%",
        mx: "auto",
        px: 3,
      }}
    >
      {children}
    </main>
  )
}

export default SiteMain
