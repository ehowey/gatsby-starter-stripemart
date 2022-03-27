export interface TypeCartItem {
  name: string
  description: string
  id: string
  price_id: string
  sanity_id: string
  price: number
  currency: string
  quantity: number
  value: number
  price_data: any
  product_data: any
  formattedValue: string
  formattedPrice: string
  type: string
  stock?: number
  _createdAt?: string
  shippingLocal?: boolean
  shippingOption?: boolean
  localOnly?: boolean
  featured?: boolean
  addOn?: boolean
  image?: any
  categories?: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
  }>
}

export interface TypeProduct {
  name: string
  description: string
  _createdAt: string
  id: string
  price_id: string
  sanity_id: string
  price: number
  image: any
  currency: string
  stock: number
  shippingOption: boolean
  localOnly: boolean
  featured: boolean
  type: string
  categories: Array<{
    _id: string
    title: string
    slug: {
      current: string
    }
  }>
}

export interface TypeProductCategory {
  title: string
  slug: string
  count: number
}

export interface TypeAddOn {
  name: string
  id: string
  sanity_id: string
  price_id: string
  price: number
  currency: string
  addOn: boolean
  image: any
  type: string
}

export interface TypeSiteMetaData {
  desktopLogo: any
  mobileLogo: any
  seoImage: {
    src: string
    width: number
    height: number
  }
  title: string
  description: string
  keywords: Array<string>
  author: string
  siteUrl: string
  twitterUsername: string
  menuLinks: Array<{ name: string; link: string }>
  alertBannerData: {
    displayAlertBanner: boolean
    text: any
  }
  storeSettingsData: {
    hasShipping: boolean | null
    hasAddOns: boolean | null
    currency: string
    allowedCountries: Array<string>
    paymentMethodTypes: Array<string>
  }
}

export interface TypeSeo {
  title?: string
  description?: string
  lang?: string
  meta?: Array<any>
  location?: string
  keywords?: Array<string>
}

export interface TypeMiscData {
  miscData: {
    _rawHomeIntro: any
    _rawThankyouText: any
    _rawErrorText: any
  }
}

export interface TypeShipping {
  localShipping: {
    hasLocalShipping: boolean | null
    title: string | null
    description: string | null
  }
  standardShipping: {
    hasStandardShipping: boolean | null
    title: string | null
    description: string | null
    percentShipping: number | null
    minShipping: number | null
    maxShipping: number | null
  }
  freeShipping: {
    hasFreeShipping: boolean | null
    title: string | null
    description: string | null
    freeShippingCutoff: number | null
  }
}
