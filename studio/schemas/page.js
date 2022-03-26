import { FiFileText } from "react-icons/fi";
import SlugInput from "sanity-plugin-better-slug";

export default {
  name: "page",
  title: "Page",
  type: "document",
  icon: FiFileText,
  fields: [
    {
      name: "seo",
      title: "SEO Information",
      type: "pageSeo",
    },
    {
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Page Slug",
      type: "slug",
      inputComponent: SlugInput,
      options: {
        source: "title",
        basePath: "https://www.site.com",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Page Content",
      type: "fullBlockContent",
      description: "Enter for a new paragraph. Shift + Enter for a new line.",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        media: FiFileText,
      };
    },
  },
};
