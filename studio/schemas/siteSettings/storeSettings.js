export default {
  name: "storeSettings",
  title: "Store Settings",
  type: "document",
  fields: [
    {
      title: "Currency",
      name: "currency",
      type: "string",
      description:
        "Select the base currency used, e.g. USD, EUR, CAD. See https://stripe.com/docs/currencies for details.",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Payment Method Types",
      name: "paymentMethodTypes",
      description:
        "An array of payment types, at a minimum select 'card' for most major credit cards. See https://stripe.com/docs/payments/payment-methods/integration-options for all payment method types. ",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Support add ons?",
      name: "hasAddOns",
      description: "Toggle add ons on and off",
      type: "boolean",
    },
    {
      title: "Support shipping?",
      name: "hasShipping",
      description: "Toggle shipping on and off",
      type: "boolean",
    },
    {
      title: "Allowed countries",
      name: "allowedCountries",
      description:
        "An array of strings for the allowed countries for shipping. For example 'US' or 'GB'. See https://stripe.com/docs/payments/checkout/shipping for details.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      hidden: ({ parent }) => parent?.hasShipping !== true,
    },
  ],
}
