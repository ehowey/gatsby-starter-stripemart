// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// We import object and document schemas
import fullBlockContent from "./blockContent/fullBlockContent"
import limitedBlockContent from "./blockContent/limitedBlockContent"
import figure from "./blockContent/figure"
import figureWide from "./blockContent/figureWide"
import alertBanner from "./siteSettings/alertBanner"
import mainNav from "./siteSettings/mainNav"
import page from "./page"
import seoDefaults from "./siteSettings/seoDefaults"
import pageSeo from "./objects/pageSeo"
import link from "./objects/link"
import navLink from "./objects/navLink"
import product from "./product"
import productCategory from "./productCategory"
import addOn from "./addOn"
import misc from "./misc"
import logo from "./siteSettings/logo"
import shipping from "./shipping"
import localShipping from "./objects/localShipping"
import freeShipping from "./objects/freeShipping"
import standardShipping from "./objects/standardShipping"
import storeSettings from "./siteSettings/storeSettings"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    fullBlockContent,
    limitedBlockContent,
    figure,
    figureWide,
    page,
    mainNav,
    alertBanner,
    seoDefaults,
    pageSeo,
    link,
    navLink,
    product,
    productCategory,
    addOn,
    misc,
    logo,
    shipping,
    localShipping,
    freeShipping,
    standardShipping,
    storeSettings,
  ]),
})
