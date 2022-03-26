/** @jsx jsx */
import { jsx } from "theme-ui"
import PortableText from "@sanity/block-content-to-react"
import { useSanityConfig } from "./useSanityConfig"
import serializers from "./sanityComponents"

const SanityContent = ({ data }) => {
  const { sanityConfig } = useSanityConfig()

  return (
    <PortableText blocks={data} serializers={serializers} {...sanityConfig} />
  )
}

export default SanityContent
