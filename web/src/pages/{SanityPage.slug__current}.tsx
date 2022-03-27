/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import Seo from "../components/shared/seo"
import Layout from "../components/layout/layout"
import SanityContent from "../components/sanity/sanityContent"
import PageHeader from "../components/shared/pageHeader"

const PageTemplate = ({ data }) => {
  const page = data.sanityPage

  return (
    <Layout>
      <Seo title={page?.title} description={page?.seo?.description} />
      <PageHeader>{page.title}</PageHeader>
      <SanityContent data={page._rawBody} />
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query SanityPageQueryUpdated($id: String!) {
    sanityPage(id: { eq: $id }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 1000 })
      seo {
        description
      }
    }
  }
`
