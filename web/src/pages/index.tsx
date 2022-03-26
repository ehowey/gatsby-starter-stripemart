/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import Seo from "../components/shared/seo"
import Layout from "../components/layout/layout"
import ProductCard from "../components/store/productCard"
import { useProducts } from "../data/useProducts"
import Breakout from "../components/shared/breakout"
import { VisuallyHidden } from "@reach/visually-hidden"
import { useEffect, useState } from "react"
import { useMiscData } from "../data/useMiscData"
import SanityContent from "../components/sanity/sanityContent"
import StoreFilterForm from "../components/store/storeFilterForm"
import sanityClient from "@sanity/client"

const HomePage = () => {
  // Get all the products
  const products = useProducts()

  // Get the page data
  const { miscData } = useMiscData()

  // State for the displayed products
  const [displayedProducts, setDisplayedProducts] = useState(products)

  // State for the stock
  const [allStock, setAllStock] = useState(null)

  // State for the stock status
  const [stockStatus, setStockStatus] = useState("LOADING")

  // Check stock dynamically after page load
  useEffect(() => {
    // Initialize SANITY client
    // No token so can only read and dataset has to be public
    const client = sanityClient({
      projectId: process.env.GATSBY_SANITY_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
      useCdn: true,
      apiVersion: "2022-02-01",
    })

    // Array of all the ids to check in the query
    const sanityIds = products.map((product) => product.sanity_id)
    const query = `*[_id in $productIds]{"sanity_id": _id, stock}`
    const params = { productIds: sanityIds }
    const fetchData = async () => {
      const data = await client.fetch(query, params)
      setAllStock(data)
      setStockStatus("LOADED")
    }

    fetchData().catch((error) => {
      setStockStatus("ERROR")
      console.log(error)
    })
  }, []) //eslint-disable-line

  return (
    <Layout>
      <Seo title="Store" />
      <VisuallyHidden as="h1">Store</VisuallyHidden>
      <div
        sx={{ mt: 4, p: { fontSize: [1, 2, 2, 2, 2], fontStyle: "italic" } }}
      >
        <SanityContent data={miscData._rawHomeIntro} />
      </div>
      <StoreFilterForm
        displayedProducts={displayedProducts}
        setDisplayedProducts={setDisplayedProducts}
      />
      <Breakout>
        <div
          sx={{
            px: [3, null, null, 4, null],
            mt: 4,
            maxWidth: "1600px",
            mx: "auto",
          }}
        >
          {displayedProducts.length > 0 ? (
            <div
              sx={{
                my: 4,
                display: "grid",
                gap: 4,
                gridTemplateColumns: [
                  "minmax(0, 1fr)",
                  "repeat(auto-fit, minmax(300px, 1fr))",
                  "repeat(auto-fit, minmax(550px, 1fr))",
                  null,
                  null,
                ],
              }}
            >
              {displayedProducts.map((product) => (
                <ProductCard
                  product={product}
                  allStock={allStock}
                  stockStatus={stockStatus}
                  key={product.name}
                />
              ))}
            </div>
          ) : (
            <Themed.p sx={{ textAlign: "center", my: 5 }}>
              Sorry! No products currently available.
            </Themed.p>
          )}
        </div>
      </Breakout>
    </Layout>
  )
}

export default HomePage
