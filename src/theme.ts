"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e1abff",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.5)",
    },
    error: {
      main: "#ef8f3a",
    },
    warning: {
      main: "#f9ff23",
    },
    info: {
      main: "#bdf193",
    },
    success: {
      main: "#bf52f3",
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
          ],
        },
      },
    },
  },
});
