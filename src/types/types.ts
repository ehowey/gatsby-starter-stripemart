export interface Product {
  name: string
  description: string
  price_id: string
  price: number
  image: any
  currency: string
  stock: number
  shippingOption: boolean
  localOnly: boolean
}

export interface Shipping {
  name: string
  description: string
  price_id: string
  price: number
  currency: string
  shippingOption: boolean
  localOnly: boolean
}

export interface SiteMetaData {
  logo: any
  seoImage: any
  title: string
  description: string
  keywords: Array<string>
  author: string
  siteUrl: string
  twitterUsername: string
  menuLinks: Array<{ name: string; link: string }>
}

export interface SeoProps {
  title: string
  description: string
  lang: string
  meta: Array<any>
  location: string
  keywords: Array<string>
}
