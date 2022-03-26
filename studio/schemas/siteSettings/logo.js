export default {
  name: "logo",
  type: "document",
  title: "Logos",
  fields: [
    {
      title: "Desktop Logo",
      name: "desktopLogo",
      type: "image",
      description: "Desktop logo, must be an .svg image.",
      options: {
        accept: ".svg",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Mobile Logo",
      name: "mobileLogo",
      type: "image",
      description: "Mobile logo, must be an .svg image.",
      options: {
        accept: ".svg",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
