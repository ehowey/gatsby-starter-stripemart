import { Themed } from "theme-ui"
import { Link } from "gatsby"

const SanitylLink = ({ children, link, ...props }) => {
  const internalSanityLink = link?.linkType === "internal"
  const externalSanityLink = link?.linkType === "external"

  if (internalSanityLink) {
    return (
      <Themed.a as={Link} to={link.internalLink} {...props}>
        {children}
      </Themed.a>
    )
  }
  if (externalSanityLink) {
    return (
      <Themed.a
        href={link.href}
        target={link.blank ? `_blank` : null}
        {...props}
      >
        {children}
      </Themed.a>
    )
  }
}

export default SanitylLink
