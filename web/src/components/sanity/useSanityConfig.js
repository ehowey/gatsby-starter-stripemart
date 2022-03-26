export const useSanityConfig = () => {
  const sanityConfig = {
    projectId: `${process.env.GATSBY_SANITY_ID}`,
    dataset: `${process.env.GATSBY_SANITY_DATASET}`,
  }
  return { sanityConfig }
}
