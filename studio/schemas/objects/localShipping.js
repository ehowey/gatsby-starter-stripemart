export default {
  name: "localShipping",
  title: "Local Shipping",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "hasLocalShipping",
      title: "Offer local shipping/pickup option?",
      description: "Toggle whether a local shipping option is offered",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Could be something like 'Local pickup'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.localShipping.hasLocalShipping === true
          ) {
            return "Required"
          }
          return true
        }),
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      description:
        "Could be something like 'Available in greater Manhattan area'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.localShipping.hasLocalShipping === true
          ) {
            return "Required"
          }
          return true
        }),
    },
  ],
}
