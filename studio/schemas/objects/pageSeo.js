export default {
  name: "pageSeo",
  title: "SEO Details",
  type: "object",
  options: {
    collapsible: true, // Makes the whole fieldset collapsible
    collapsed: true, // Defines if the fieldset should be collapsed by default or not
  },
  fields: [
    {
      name: "description",
      type: "text",
      rows: 3,
      title: "Description",
      description:
        "Describe this page for search engines and social media. Could be a summary or an exceprt. Max length is 155 characters. If left blank the default one is used.",
      validation: (Rule) => Rule.max(155),
    },
  ],
}
