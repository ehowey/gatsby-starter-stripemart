export default {
  name: "shipping",
  title: "Shipping Option",
  type: "document",
  initialValue: {
    hasShipping: false,
  },
  fields: [
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
