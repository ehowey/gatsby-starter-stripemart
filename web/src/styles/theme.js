// See https://theme-ui.com/ for more info and also https://www.gatsbyjs.com/docs/theme-ui/
// Try changing some of the colors below to see what happens.
import { baseColors } from "./baseColors"
import "@fontsource/cormorant/700.css"

const theme = {
  breakpoints: ["480px", "768px", "1280px", "1920px"],
  fonts: {
    body: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    heading: "Cormorant, serif",
    monospace:
      'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
  fontSizes: [
    "0.875rem",
    "1rem",
    "1.125rem",
    "1.25rem",
    "1.5rem",
    "1.875rem",
    "2.25rem",
    "3rem",
    "4rem",
    "4.5rem",
  ],
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    body: 400,
    heading: 700,
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.7",
    loose: "2",
    body: "1.7",
    heading: "1.25",
  },
  colors: {
    ...baseColors,
    background: baseColors.cyan[1], // Background color
    backgroundError: baseColors.red[2], // Background color for errors
    text: baseColors.gray[8], // Default text color
    textGray: "#6e6e6e", // Used for secondary text, and borders
    textGrey: "#6e6e6e", // Used for secondary text, and borders
    textError: baseColors.red[8], // Text color for errors
    primary: baseColors.cyan[9], // Main brand color, most links, most buttons
    primaryHover: baseColors.cyan[10], // Darker variation for hover
    muted: baseColors.gray[2], // Light gray used as a background in some places
    disabled: baseColors.gray[4], // Color for disabled form inputs
    header: {
      background: baseColors.gray[1],
      backgroundOpen: "#d0defa",
      backgroundScroll: "#d0defa",
      text: baseColors.gray[8],
      textOpen: baseColors.gray[8],
      navHover: baseColors.gray[4],
    },
    footer: {
      background: baseColors.cyan[10],
      text: baseColors.gray[1],
      links: baseColors.gray[1],
      icons: baseColors.gray[2],
    },
    alert: {
      background: baseColors.orange[4],
      text: baseColors.gray[9],
      links: baseColors.indigo[6],
      linksHover: baseColors.indigo[5],
    },
  },
  sizes: {
    maxContentWidth: "720px", // Sets the default container size
  },
  space: [
    "0",
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "16rem",
    "32rem",
  ],
  shadows: {
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
    none: "none",
  },
  zIndices: {
    header: 1000,
    branding: 1100,
    nav: 1100,
    navMobile: 999,
    dropdown: 1050,
    cart: 2000,
  },
  styles: {
    root: {
      backgroundColor: "background",
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    p: {
      fontSize: [2, null, 3, null, null],
      mb: 3,
    },
    ul: {
      fontSize: [2, null, 3, null, null],
      pl: 3,
      mb: 3,
    },
    ol: {
      fontSize: [2, null, 3, null, null],
      pl: 3,
      mb: 3,
    },
    li: {
      marginBottom: 3,
      lineHeight: "normal",
      ":last-of-type": {
        mb: 0,
      },
    },
    a: {
      color: "primary",
      textDecoration: "underline",
      //Handle overflowing text
      overflowWrap: "break-word",
      wordWrap: "break-word",
      wordBreak: "break-word",
      ":hover": {
        color: "primaryHover",
      },
    },
    h1: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7, null, null],
      mt: 5,
      mb: 3,
      letterSpacing: "wide",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [4, 5, 6, null, null],
      mt: 4,
      mb: 3,
      letterSpacing: "wide",
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [4, 5, null, null, null],
      mt: 4,
      mb: 3,
      letterSpacing: "wide",
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 3,
      mt: 4,
      mb: 3,
      letterSpacing: "wide",
    },
    h5: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 2,
      mt: 3,
      mb: 3,
      letterSpacing: "wide",
    },
    h6: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 1,
      mt: 3,
      mb: 3,
      letterSpacing: "wide",
    },
    blockquote: {
      fontStyle: "italic",
      bg: "muted",
      p: 3,
      my: 3,
      mx: [1, 2, 4, null, null],
      borderLeft: "5px solid",
      borderColor: "primary",
      borderRadius: "2px",
    },
    table: {
      width: "100%",
      my: 3,
      borderCollapse: "collapse",
    },
    th: {
      verticalAlign: "bottom",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "muted",
      backgroundColor: "muted",
      padding: 2,
      textAlign: "inherit",
    },
    td: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "muted",
      verticalAlign: "top",
      padding: 2,
    },
  },
  buttons: {
    // Solid colored button style
    primary: {
      cursor: "pointer",
      bg: "primary",
      borderStyle: "solid",
      borderColor: "primary",
      borderWidth: "2px",
      borderRadius: "4px",
      fontWeight: "bold",
      px: 2,
      py: 1,
      transition: "all 0.3s ease-in-out",
      ":hover, :focus, :active": {
        bg: "primaryHover",
        borderColor: "primaryHover",
      },
    },
    // Add to Cart Button
    addToCart: {
      cursor: "pointer",
      bg: "cyan.3",
      color: "cyan.9",
      fontWeight: 700,
      border: "none",
      py: 2,
      px: 3,
      textTransform: "uppercase",
      letterSpacing: "wide",
      transition: "all 0.3s ease-in-out",
      ":disabled": {
        opacity: 0.3,
        bg: "gray.4",
        cursor: "default",
      },
      ":disabled:hover, :disabled:active, :disabled:focus": {
        bg: "gray.4",
      },
      ":hover, :focus, :active": {
        bg: "cyan.4",
      },
    },
    // Outlined button style
    secondary: {
      cursor: "pointer",
      bg: "transparent",
      color: "text",
      fontWeight: "bold",
      borderStyle: "solid",
      borderColor: "primary",
      borderWidth: "2px",
      borderRadius: "4px",
      px: 2,
      py: 1,
      transition: "all 0.3s ease-in-out",
      ":hover, :focus, :active": {
        bg: "muted",
      },
    },
    zoom: {
      cursor: "pointer",
      bg: "primary",
      borderRadius: "0",
      borderTopLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      fontWeight: "bold",
      py: 2,
      px: 3,
      transition: "all 0.3s ease-in-out",
      ":hover, :focus, :active": {
        bg: "primaryHover",
        borderColor: "primaryHover",
      },
    },
  },
}

export default theme
