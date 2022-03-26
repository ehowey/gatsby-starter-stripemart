export default {
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    {
      title: "Type of link",
      description:
        "Internal links are restricted to relative links to other pages on the website. External links go to other websites using the format `https://www.google.com`.",
      name: "linkType",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
    },
    {
      title: "URL",
      name: "href",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["https", "http", "mailto", "tel"],
        }),
    },
    {
      title: "Open in new tab?",
      name: "blank",
      description: "Read https://css-tricks.com/use-target_blank/",
      type: "boolean",
      hidden: ({ parent }) => parent?.linkType !== "external",
    },
    {
      name: "internalLink",
      type: "string",
      title: "Internal Link",
      description:
        "Relative to the root of your site. For example if you wanted to link to the page www.website.com/blog/my-great-post/ then the link should be in the format `/blog/my-great-post/`",
      hidden: ({ parent }) => parent?.linkType !== "internal",
    },
  ],
}
