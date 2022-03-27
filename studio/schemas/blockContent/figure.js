export default {
  name: "figure",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      description:
        "Important for search engines and accessiblity. Alternative text should be descriptive but does not need to say 'picture', for example if it was an image of mountains your text for screen readers could be 'Sunny mountain range'.",
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Show caption?",
      name: "showCaption",
      type: "boolean",
      options: {
        isHighlighted: true,
      },
    },
    {
      title: "Caption",
      name: "caption",
      description: "Shown below your image",
      type: "string",
      hidden: ({ parent }) => parent?.showCaption !== true,
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "alt",
    },
  },
}
