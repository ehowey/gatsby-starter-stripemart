export default {
  name: "seoDefaults",
  type: "document",
  title: "Seo Defaults",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site Title",
      description:
        "Appears in the header bar and in various other places on the website.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "siteUrl",
      type: "url",
      title: "Site URL",
      description:
        "The root url of your website, e.g. https://www.erichowey.dev. Used for canonical links.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "text",
      rows: 3,
      title: "Description",
      description:
        "Describe your website for search engines and social media. Should not be longer than 155 characters.",
      validation: (Rule) => Rule.required().max(155),
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description:
        "Add keywords for search engines that describes your website.",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Default Social Sharing Image",
      name: "seoImage",
      type: "image",
      description:
        "The default sharing image for places like Twitter and Facebook when sharing a link to your website. Should be 1200 x 675px.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "twitter",
      type: "string",
      title: "Twitter Username",
      description: "Optional. Twitter username, e.g. @name",
    },
    {
      name: "facebook",
      type: "string",
      title: "Facebook App Id",
      description:
        "Optional. You can find the Facebook app id in your app dashboard.",
    },
  ],
}
