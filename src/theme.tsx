import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { forwardRef } from "react";
import Link from "next/link";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const LinkBehaviour = forwardRef<HTMLAnchorElement>(function LinkBehaviour(
  props,
  ref
) {
  //@ts-ignore
  return <Link ref={ref} {...props} />;
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#273b40",
    },
    secondary: {
      main: "#cae9ea",
    },
    error: {
      main: red.A700,
    },
    warning: {
      main: "#1d1d1d",
    },
    info: {
      main: "#3c4748",
    },
    success: {
      main: "#208c8c",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, body > div:first-child, div#__next, div#__next > div": {
          height: "100%",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        //@ts-ignore
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
});

export default theme;
