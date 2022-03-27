export default {
  name: "freeShipping",
  title: "Free Shipping",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "hasFreeShipping",
      title: "Offer free shipping option?",
      description: "Toggle whether a free shipping option is offered",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Could be something like 'Free shipping'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.freeShipping.hasFreeShipping === true
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
      description: "Could be something like 'For orders over $99'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.freeShipping.hasFreeShipping === true
          ) {
            return "Required"
          }
          return true
        }),
    },
    {
      title: "Free shipping cutoff amount",
      name: "freeShippingCutoff",
      description:
        "Sets the cutoff for free shipping. For example if you want to offer free shipping over $99 then set this value to 99.",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.freeShipping.hasFreeShipping === true
          ) {
            return "Required"
          }
          if (value < 0) {
            return "Please select a positive number."
          }
          return true
        }),
    },
  ],
}
