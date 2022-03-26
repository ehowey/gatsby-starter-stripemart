export default {
  name: "shipping",
  title: "Shipping Option",
  type: "document",
  fields: [
    {
      title: "Display Shipping Options?",
      name: "hasShipping",
      description:
        "Toggle whether shipping options are displayed to the customer. You can toggle this off if you aren't offering any shipping.",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Local shipping",
      name: "localShipping",
      type: "localShipping",
    },
    {
      title: "Standard shipping",
      name: "standardShipping",
      type: "standardShipping",
    },
    {
      title: "Free shipping",
      name: "freeShipping",
      type: "freeShipping",
    },
  ],
}
