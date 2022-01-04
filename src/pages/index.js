/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import Seo from "../components/shared/seo"
import Layout from "../components/layout/layout"
import ProductCard from "../components/store/productCard"
import { useStripeProducts } from "../data/useStripeProducts"
import Breakout from "../components/shared/breakout"
import { VisuallyHidden } from "@reach/visually-hidden"

const HomePage = () => {
  const products = useStripeProducts()

  return (
    <Layout>
      <Seo title="Store" />
      <Breakout>
        <div sx={{ mx: "auto", maxWidth: "960px", px: 3, mt: 4 }}>
          <VisuallyHidden as="h1">Store</VisuallyHidden>
          <Themed.p
            sx={{
              fontSize: 1,
              fontStyle: "italic",
              maxWidth: "65ch",
              mx: "auto",
            }}
          >
            Suspendisse in nibh mauris. Suspendisse pharetra metus rhoncus mi
            consequat scelerisque. Mauris a efficitur metus. Maecenas dictum
            diam ac viverra maximus.{" "}
            <Themed.a href="https://www.google.com">Quisque tincidunt</Themed.a>
            , mi sed tempus convallis, lacus nunc placerat tortor, ut feugiat ex
            nulla quis est.
          </Themed.p>
          {products.length > 0 ? (
            <div
              sx={{
                my: 4,
                display: "grid",
                gap: 4,
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {products.map((product) => (
                <ProductCard product={product} key={product.name} />
              ))}
            </div>
          ) : (
            <Themed.p sx={{ textAlign: "center", my: 5 }}>
              No products currently available.
            </Themed.p>
          )}
        </div>
      </Breakout>
    </Layout>
  )
}

export default HomePage
