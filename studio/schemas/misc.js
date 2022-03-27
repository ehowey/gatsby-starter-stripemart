import { FiFileText } from "react-icons/fi"
import SlugInput from "sanity-plugin-better-slug"

export default {
  name: "misc",
  title: "Miscellaneous",
  type: "document",
  fields: [
    {
      name: "homeIntro",
      title: "Home Page Intro",
      type: "limitedBlockContent",
      description:
        "Shown as an introduction before your store items on the homepage. Enter for a new paragraph. Shift + Enter for a new line.",
    },
    {
      name: "thankyouText",
      title: "Thank You Text",
      type: "limitedBlockContent",
      description:
        "Shown on the thank-you page after a successful purchase. Enter for a new paragraph. Shift + Enter for a new line.",
    },
    {
      name: "errorText",
      title: "Error Text",
      type: "limitedBlockContent",
      description:
        "Shown on the error page when there is a checkout error. Enter for a new paragraph. Shift + Enter for a new line.",
    },
  ],
}
