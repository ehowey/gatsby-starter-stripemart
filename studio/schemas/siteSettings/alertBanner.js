export default {
  name: "alertBanner",
  title: "Alert Banner",
  type: "document",
  fields: [
    {
      name: "displayAlertBanner",
      title: "Display Alert Banner?",
      type: "boolean",
    },
    {
      name: "text",
      title: "Alert Banner Text",
      type: "text",
      description: "Keep this short for mobile users.",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
  ],
}
