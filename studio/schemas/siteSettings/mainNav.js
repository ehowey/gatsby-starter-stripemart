export default {
  name: "mainNav",
  type: "document",
  title: "Main Navigation",
  fields: [
    {
      title: "Navigation links",
      name: "mainNav",
      description:
        "Top level navigation items that appears in the main nav area of the site.",
      type: "array",
      of: [{ type: "navLink" }],
    },
  ],
}
