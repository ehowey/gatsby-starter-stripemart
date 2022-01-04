import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Seo from "./src/components/shared/seo"
import "./src/styles/global.css"

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector("#reach-skip-nav")
    if (skipLink) {
      skipLink.focus()
    }
  }
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={{ Seo }}>{element}</MDXProvider>
}
