import S from "@sanity/desk-tool/structure-builder"
import {
  FiSettings,
  FiLink,
  FiAlertTriangle,
  FiSearch,
  FiPenTool,
  FiGift,
  FiTruck,
  FiTag,
  FiBookOpen,
  FiGrid,
  FiImage,
  FiBox,
  FiFolder,
  FiPlusSquare,
  FiStar,
  FiTrendingUp,
  FiArchive,
  FiMinusSquare,
  FiBriefcase,
} from "react-icons/fi"

const hiddenDocTypes = (listItem) =>
  ![
    "siteSettings",
    "menuLink",
    "page",
    "post",
    "mainNav",
    "alertBanner",
    "postCategory",
    "homePage",
    "seoDefaults",
    "media.tag",
    "product",
    "productCategory",
    "addOn",
    "misc",
    "logo",
    "shipping",
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(FiSettings)
        .child(
          S.list()
            .title("Site Settings")
            .items([
              S.listItem()
                .title("Store settings")
                .icon(FiBriefcase)
                .child(
                  S.document()
                    .title("Store settings")
                    .schemaType("storeSettings")
                    .documentId("storeSettings")
                ),
              S.listItem()
                .title("Logos")
                .icon(FiImage)
                .child(
                  S.document()
                    .title("Logos")
                    .schemaType("logo")
                    .documentId("logo")
                ),
              S.listItem()
                .title("SEO Defaults")
                .icon(FiSearch)
                .child(
                  S.document()
                    .title("SEO Defaults")
                    .schemaType("seoDefaults")
                    .documentId("seoDefaults")
                ),
              S.listItem()
                .title("Navigation Links")
                .icon(FiLink)
                .child(
                  S.document()
                    .title("Navigation Links")
                    .schemaType("mainNav")
                    .documentId("mainNav")
                ),
              S.listItem()
                .title("Alert Banner")
                .icon(FiAlertTriangle)
                .child(
                  S.document()
                    .title("Alert Banner")
                    .schemaType("alertBanner")
                    .documentId("alertBanner")
                ),
            ])
        ),
      // Add a visual divider (optional)
      S.divider(),
      S.listItem()
        .title("Products")
        .icon(FiFolder)
        .child(
          S.list()
            .title("Site Settings")
            .items([
              S.listItem()
                .title("Product Categories")
                .icon(FiTag)
                .child(
                  S.documentTypeList("productCategory").title(
                    "Product Categories"
                  )
                ),
              S.listItem()
                .title("Active products")
                .icon(FiTrendingUp)
                .child(
                  S.documentList()
                    .title("Active products")
                    .filter('_type == "product" && active')
                ),
              S.listItem()
                .title("In stock")
                .icon(FiPlusSquare)
                .child(
                  S.documentList()
                    .title("In stock")
                    .filter('_type == "product" && stock > 0')
                ),
              S.listItem()
                .title("Out of stock")
                .icon(FiMinusSquare)
                .child(
                  S.documentList()
                    .title("Out of stock")
                    .filter('_type == "product" && stock <= 0 && active')
                ),
              S.listItem()
                .title("Featured")
                .icon(FiStar)
                .child(
                  S.documentList()
                    .title("Featured")
                    .filter('_type == "product" && featured')
                ),

              S.listItem()
                .title("Archived products")
                .icon(FiArchive)
                .child(
                  S.documentList()
                    .title("Archived products")
                    .filter('_type == "product" && !active')
                ),
              S.listItem()
                .title("All Products")
                .icon(FiBox)
                .child(
                  S.documentList()
                    .title("All products")
                    .filter('_type == "product"')
                ),
            ])
        ),
      S.listItem()
        .title("Add Ons")
        .icon(FiGift)
        .child(S.documentTypeList("addOn").title("Add Ons")),
      S.listItem()
        .title("Shipping options")
        .icon(FiTruck)
        .child(
          S.document()
            .title("Shipping options")
            .schemaType("shipping")
            .documentId("shipping")
        ),
      S.listItem()
        .title("Pages")
        .icon(FiBookOpen)
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Miscellaneous Text")
        .icon(FiGrid)
        .child(
          S.document()
            .title("Miscellaneous Text")
            .schemaType("misc")
            .documentId("misc")
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])

export const getDefaultDocumentNode = (props) => {
  return S.document().views([S.view.form().icon(FiPenTool)])
}
