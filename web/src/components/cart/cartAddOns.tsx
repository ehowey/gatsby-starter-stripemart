/** @jsx jsx */
import { Themed, jsx } from "theme-ui"
import { useAddOns } from "../../data/useAddOns"
import { useSanityMetadata } from "../../data/useSanityMetadata"

import { formatCurrencyString } from "use-shopping-cart"
import { FiGift } from "react-icons/fi"

const CartAddOns = ({ register }) => {
  // Get the Add ons
  const addOns = useAddOns()
  // Get the currency
  const { storeSettingsData } = useSanityMetadata()

  return (
    <div sx={{ px: [2, 3, null, null, null] }}>
      <Themed.h2
        sx={{
          fontSize: [1, 1, 1, 1, 1],
          display: "flex",
          alignItems: "center",
          fontFamily: "body",
          fontWeight: 600,
          mt: 0,
        }}
      >
        <FiGift sx={{ fontSize: 4, mr: 2 }} />
        Add ons
      </Themed.h2>
      <ul sx={{ listStyle: "none", m: 0, p: 0 }}>
        {addOns.map((addOn) => (
          <li
            key={addOn.name}
            sx={{
              mb: 2,
              ":last-of-type": {
                mb: 0,
              },
            }}
          >
            <label
              sx={{
                cursor: "pointer",
                lineHeight: "body",
                display: "grid",
                gridTemplateColumns: "1em auto",
                gap: 2,
                alignItems: "center",
                justifyContent: "start",
                fontSize: [0, 1, null, null, null],
              }}
            >
              <input
                type="checkbox"
                {...register(`addOns.${addOn.price_id}`)}
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
              {addOn.name} &mdash;{" "}
              {formatCurrencyString({
                value: addOn.price,
                currency: storeSettingsData?.currency,
              })}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartAddOns
