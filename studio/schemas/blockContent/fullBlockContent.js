/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

import { FiMail } from "react-icons/fi"

export default {
  title: "Block Content",
  name: "fullBlockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "figure",
    },
    {
      type: "figureWide",
    },
  ],
}
