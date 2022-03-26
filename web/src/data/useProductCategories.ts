import { useStaticQuery, graphql } from "gatsby"
import { TypeProductCategory } from "../types/types"

export const useProductCategories = (): Array<TypeProductCategory> => {
  const data = useStaticQuery(
    graphql`
      query SanityProductCategoriesQuery {
        allSanityProductCategory {
          nodes {
            _id
            title
            slug {
              current
            }
          }
        }
        allSanityProduct(filter: { active: { eq: true } }) {
          nodes {
            _id
            stock
            categories {
              title
              slug {
                current
              }
            }
          }
        }
      }
    `
  )

  const rawCategories = data.allSanityProductCategory.nodes
  const rawProducts = data.allSanityProduct.nodes

  const categories = rawCategories
    .map((node) => {
      let count = 0
      rawProducts.map((product) =>
        product.categories.map(
          (productCategory) =>
            productCategory.slug.current === node.slug.current && count++
        )
      )
      const categoryFormatted = {
        title: node.title,
        slug: node.slug.current,
        count: count,
      }

      return categoryFormatted
    })
    .sort((a, b) => b.count - a.count)

  const countProductsInStock = rawProducts.filter(
    (product) => product.stock > 0
  ).length

  const inStock = {
    title: "In stock",
    slug: "in-stock",
    count: countProductsInStock,
  }

  const allCategories = [inStock, ...categories]

  return allCategories
}
