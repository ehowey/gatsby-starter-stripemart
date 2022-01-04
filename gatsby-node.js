exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: `defaultStock`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return "1"
          }
          return source[info.fieldName]
        },
      }
    },
  })

  createFieldExtension({
    name: `defaultShipping`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return "false"
          }
          return source[info.fieldName]
        },
      }
    },
  })

  const stripeMetadataTypes = `
    type StripePrice implements Node {
      product: PriceProduct
    }
    type PriceProduct {
      metadata: ProductMetadata
    }
    type ProductMetadata {
      stock: String @defaultStock
      shipping: String @defaultShipping
    }
  `

  createTypes(stripeMetadataTypes)
}
