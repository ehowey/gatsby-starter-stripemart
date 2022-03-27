require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const isProd = process.env.NODE_ENV === "production"
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"

module.exports = {
  // Site config is mainly done in SANITY
  siteMetadata: {
    siteUrl: process.env.URL ?? "https://www.gatsbyjs.com", //Change to you site address, required for sitemap.xml and robots.txt file among other things
  },
  plugins: [
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
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: process.env.GATSBY_SANITY_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
        overlayDrafts: !isProd || previewEnabled, // drafts in dev & Gatsby Cloud Preview
        watchMode: !isProd,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Stripemart`,
        short_name: `Stripemart`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `src/images/stripemart-icon.jpeg`, // This path is relative to the root of the site.
      },
    },
  ],
}
