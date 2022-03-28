/** @jsx jsx */
import { jsx, Themed } from "theme-ui"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useProductCategories } from "../../data/useProductCategories"
import { useProducts } from "../../data/useProducts"

const StoreSortForm = ({ displayedProducts, setDisplayedProducts }) => {
  // Get the data
  const products = useProducts()
  const categories = useProductCategories()

  // Initialize React Hook Forms
  const { register, control }: any = useForm({
    defaultValues: {
      sortOrder: "default",
      selectedCategories: { "in-stock": true },
    },
  })

  // Watch the selection change for sort order
  const formData = useWatch({ control })

  // Update the sort order based on the selection
  useEffect(() => {
    // Get the data
    const { sortOrder, selectedCategories } = formData

    // Get any active filters
    const activeFilters = Object.keys(selectedCategories).filter((id) => {
      return selectedCategories[id]
    })

    // Remove in stock option from filters
    const filtersWithoutStock = activeFilters.filter(
      (filter) => filter !== "in-stock"
    )

    // Variable to hold the final set of products
    // If nothing happens we just have the products as a fallback
    let filteredProducts = products
    let finalProducts = products

    // Filter products
    // Only filter if we have some active filters
    if (filtersWithoutStock.length > 0) {
      const filtered = products.filter((product) =>
        product.categories.some(
          (category) => filtersWithoutStock.indexOf(category.slug.current) >= 0
        )
      )
      filteredProducts = filtered
    }

    // Handle filtering in stock/out of stock
    if (selectedCategories["in-stock"] === true) {
      const filtered = filteredProducts.filter((product) => product.stock > 0)
      finalProducts = filtered
    }
    if (selectedCategories["in-stock"] === false) {
      finalProducts = filteredProducts
    }

    // Finally we can handle sorting
    if (sortOrder === "default") {
      const featured = finalProducts.filter(
        (product) => product.featured === true
      )
      const sorted = finalProducts
        .filter((product) => product.featured !== true)
        .sort((a, b) => {
          let dateA = a._createdAt
          let dateB = b._createdAt
          if (dateA > dateB) {
            return -1
          } else if (dateA < dateB) {
            return 1
          }
          return 0
        })

      setDisplayedProducts([...featured, ...sorted])
    }
    if (sortOrder === "recent") {
      const sorted = finalProducts.sort((a, b) => {
        let dateA = a._createdAt
        let dateB = b._createdAt
        if (dateA > dateB) {
          return -1
        }
        if (dateA < dateB) {
          return 1
        }
        return 0
      })
      setDisplayedProducts([...sorted])
    }
    if (sortOrder === "priceLow") {
      const sorted = finalProducts.sort((a, b) => a.price - b.price)
      setDisplayedProducts([...sorted])
    }
    if (sortOrder === "priceHigh") {
      const sorted = finalProducts.sort((a, b) => b.price - a.price)
      setDisplayedProducts([...sorted])
    }
  }, [formData]) //eslint-disable-line

  return (
    <form>
      <details open>
        <summary
          sx={{
            cursor: "pointer",
            fontSize: [0, 0, 0, 0, 0],
            textTransform: "uppercase",
            fontFamily: "body",
            fontWeight: 600,
            mt: 0,
            mb: 1,
            color: "textGray",
          }}
        >
          Filter{" "}
          <span sx={{ fontWeight: 400, textTransform: "none" }}>
            - {displayedProducts.length}{" "}
            {displayedProducts.length === 1 ? "product" : "products"}
          </span>
        </summary>
        <ul
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <li
              key={category.slug}
              sx={{
                mr: 3,
                mb: 3,
                ":last-of-type": {
                  mr: 0,
                },
              }}
            >
              <label
                sx={{
                  cursor: "pointer",
                  lineHeight: "body",
                  display: "grid",
                  gridTemplateColumns: "1em minmax(0, 1fr)",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "start",
                  fontSize: 1,
                }}
              >
                <input
                  type="checkbox"
                  {...register(`selectedCategories.${category.slug}`)}
                  sx={{
                    cursor: "pointer",
                    appearance: "none",
                    backgroundColor: "background",
                    m: 0,
                    font: "inherit",
                    color: "currentColor",
                    width: "1.15em",
                    height: "1.15em",
                    border: "0.15em solid currentColor",
                    borderRadius: "0.15em",
                    display: "grid",
                    placeContent: "center",
                    // transform: "translateY(-0.075em)",
                    ":before": {
                      content: "''",
                      width: "0.65em",
                      height: "0.65em",
                      transform: "scale(0)",
                      transition: "120ms transform ease-in-out",
                      boxShadow: "inset 1em 1em #333",
                      backgroundColor: "CanvasText",
                      transformOrigin: "bottom left",
                      clipPath:
                        "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)",
                    },
                    ":checked::before": {
                      transform: "scale(1)",
                    },
                    ":focus": {
                      outline: "max(2px, 0.15em) solid #7871FE",
                      outlineOffset: "max(2px, 0.15em)",
                    },
                  }}
                />
                {category.title}
              </label>
            </li>
          ))}
        </ul>
      </details>
      <label
        htmlFor="sortOrder"
        sx={{
          color: "textGray",
          fontFamily: "body",
          textTransform: "uppercase",
          fontSize: [0, 0, 0, 0, 0],
          fontWeight: 600,
          mb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        Sort
      </label>
      <div
        sx={{
          width: "100%",
          minWidth: "15ch",
          maxWidth: "18ch",
          border: "1px solid #333",
          borderRadius: "2px",
          py: 1,
          px: 2,
          fontSize: 1,
          cursor: "pointer",
          lineHeight: "tight",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(to top, #f9f9f9, #fff 33%)",
          display: "grid",
          alignItems: "center",
          gridTemplateAreas: `'select'`,
          position: "relative",
          ":after": {
            gridArea: "select",
            justifySelf: "end",
            content: "''",
            borderStyle: "solid",
            borderWidth: "0.15em 0.15em 0 0",
            height: "10px",
            width: "10px",
            position: "relative",
            top: "-2px",
            transform: "rotate(135deg)",
          },
        }}
      >
        <select
          {...register("sortOrder")}
          id="sortOrder"
          sx={{
            // A reset of styles, including removing the default dropdown arrow
            appearance: "none",
            // Additional resets for further consistency
            backgroundColor: "transparent",
            border: "none",
            padding: "0 1em 0 0",
            margin: 0,
            width: "100%",
            fontFamily: "inherit",
            fontSize: "inherit",
            cursor: "inherit",
            lineHeight: "inherit",
            outline: "none",
            gridArea: "select",
            zIndex: 1,
            "::-ms-expand": {
              display: "none",
            },
            ":focus + .focus": {
              position: "absolute",
              top: "-1px",
              left: "-1px",
              right: "-1px",
              bottom: "-1px",
              border: "2px solid blue",
              borderRadius: "inherit",
            },
          }}
        >
          <option value="default">Default</option>
          <option value="recent">Recently added</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
        <span className="focus"></span>
      </div>
    </form>
  )
}

export default StoreSortForm
