import { theme as baseTheme } from "@chakra-ui/core";

const fonts = {
  heading: `Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
};

const theme = {
  ...baseTheme,
  shadows: {
    ...baseTheme.shadows,
    blue: "0px 40px 60px #0E77FF26",
  },
  colors: {
    ...baseTheme.colors,
    whiteTransparent: "rgba(255,255,255, 0.8)",
    lightBlue: "#68BAE5",
    baseBlue: "#00ABE6",
    darkBlue: "#007FAA",

    lightPurple: "#AD1AAC",
    basePurple: "#531164",
    darkPurple: "#3C1053",

    lightRed: "#D53876",
    baseRed: "#BE2C66",

    lightGray: "#F9FDFE",
    baseGray: "#AAB6B9",

    baseYellow: "#FFD189",
    baseGreen: "#5BB162",
    black: "#16161D",
  },
  fonts,
};

export default theme;
