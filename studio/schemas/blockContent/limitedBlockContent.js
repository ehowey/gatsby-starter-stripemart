import { FiMail } from "react-icons/fi"

export default {
  name: "limitedBlockContent",
  type: "array",
  title: "Excerpt",

  of: [
    {
      title: "Block",
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "Link type",
                description:
                  "Internal links are restricted to relative links to other pages on the website. External links go to other websites using the format `https://www.google.com`.",
                name: "linkType",
                type: "string",
                options: {
                  list: [
                    { title: "External", value: "external" },
                    { title: "Internal", value: "internal" },
                  ], // <-- predefined values
                  layout: "radio", // <-- defaults to 'dropdown'
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
          },
          {
            title: "Email",
            name: "emailLink",
            type: "object",
            fields: [
              { name: "emailAddress", type: "string", title: "Email Address" },
            ],
            blockEditor: {
              icon: FiMail,
            },
          },
        ],
      },
    },
  ],
}
