import { useStaticQuery, graphql } from "gatsby"
import { TypeMiscData } from "../types/types"

export const useMiscData = (): TypeMiscData => {
  const data = useStaticQuery(
    graphql`
      query MiscQuery {
        allSanityMisc(limit: 1, sort: { fields: _updatedAt, order: DESC }) {
          nodes {
            _rawHomeIntro(resolveReferences: { maxDepth: 10 })
            _rawThankyouText(resolveReferences: { maxDepth: 10 })
            _rawErrorText(resolveReferences: { maxDepth: 10 })
          }
        }
      }
    `
  )

  const miscData = data.allSanityMisc.nodes[0]

  return {
    miscData,
  }
}
