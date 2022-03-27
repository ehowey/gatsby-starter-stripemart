/** @jsx jsx */
import { jsx, Themed } from "theme-ui"

const PageHeader = ({ children, ...props }) => {
  return (
    <Themed.h1
      sx={{
        mt: [3, 4, 5, null, null],
        mb: [3, 4, null, null, null],
        "::after": {
          display: "block",
          content: '""',
          pt: 1,
          width: "60px",
          borderBottomStyle: "solid",
          borderBottomWidth: ["4px", "5px", "6px", null, null],
          borderBottomColor: "primary",
          borderRadius: "4px",
        },
      }}
      {...props}
    >
      {children}
    </Themed.h1>
  )
}

export default PageHeader
