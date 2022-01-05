require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  // //Gatsby Config
  // jsxRuntime: "automatic",
  // jsxImportSource: "theme-ui",
  // Site config
  siteMetadata: {
    title: `Gatsby Starter StripeMart`,
    description: `A minimalist e-commerce starter using Gatsby, Stripe, Use-Shopping-Cart and Netlify.`,
    keywords: [`gatsby`, `stripe`, `use-shopping-cart`, `e-commerce`, `store`],
    author: `Eric Howey`,
    siteUrl: `https://gatsby-starter-stripemart.netlify.app/`, //Change to you site address, required for sitemap.xml and robots.txt file among other things
    twitterUsername: `@your_username`,
    menuLinks: [
      {
        name: `Store`,
        link: `/`,
      },
      {
        name: `Custom Orders`,
        link: `/custom-orders/`,
      },
      {
        name: `About`,
        link: `/about/`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/components/layout/layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {},
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              withWebp: true,
              backgroundColor: `transparent`,
              quality: 50,
            },
          },
          {
            resolve: "gatsby-remark-smartypants",
            options: {},
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow noopener",
            },
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              withWebp: true,
              backgroundColor: `transparent`,
              quality: 50,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby-Starter-StripeMart`,
        short_name: `StripeMart`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `src/images/stripemart-icon.jpg`, // This path is relative to the root of the site.
      },
    },
  ],
}
