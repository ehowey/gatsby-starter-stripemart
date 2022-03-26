export default {
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    {
      title: "Link text",
      description: "The text displayed for the navigation link.",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "internalLink",
      type: "string",
      title: "Internal Link",
      description: "Should be in the format `/blog/my-great-post/`.",
      validation: (Rule) => Rule.required(),
    },
  ],
}
