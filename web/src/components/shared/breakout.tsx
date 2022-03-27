/** @jsx jsx */
import { jsx } from "theme-ui"

const Breakout = ({ children, ...props }) => {
  return (
    <div
      sx={{
        width: "100vw",
        position: "relative",
        left: "calc(-50vw + 50%)",
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default Breakout
