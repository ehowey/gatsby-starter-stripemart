export default {
  name: "standardShipping",
  title: "Standard Shipping",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "hasStandardShipping",
      title: "Offer standard shipping option?",
      description: "Toggle whether a standard shipping option is offered",
      type: "boolean",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Could be something like 'Standard shipping'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.standardShipping.hasStandardShipping === true
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
      description: "Could be something like '5-10 Business days'",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.standardShipping.hasStandardShipping === true
          ) {
            return "Required"
          }
          return true
        }),
    },
    {
      title: "Shipping percentage",
      name: "percentShipping",
      description:
        "Sets the percentage used for calculating the shipping cost. For example if you set the percentage to 20% then it would calculate $10 shipping for a $50 product.",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.standardShipping.hasStandardShipping === true
          ) {
            return "Required"
          }
          if (value < 0 || value > 100) {
            return "Please select a value between 0 and 100"
          }
          return true
        }),
    },
    {
      title: "Minimum shipping amount",
      name: "minShipping",
      description: "Sets the minimum shipping amount",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.standardShipping.hasStandardShipping === true
          ) {
            return "Required"
          }
          if (value < 0) {
            return "Please select a positive number."
          }
          return true
        }),
    },
    {
      title: "Maximum shipping amount",
      name: "maxShipping",
      description: "Sets the maximum shipping amount",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (
            value == undefined &&
            context.document.standardShipping.hasStandardShipping === true
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
