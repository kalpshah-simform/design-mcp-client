/**
 * Design tokens sourced from the design-system MCP (`get-tailwind-theme`, default theme).
 * Do not hardcode colors/spacing in components — use these token classes.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#0052CC",
      secondary: "#172B4D",
      "gray-100": "#F7F8FA",
      "gray-600": "#61646C",
      "gray-900": "#161A1D",
      surface: "#FFFFFF",
      background: "#F7F8FA",
      success: "#216E4E",
      warning: "#974F0C",
      error: "#AE2A19",
    },
    spacing: {
      0: "0",
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      sm: "0 1px 2px rgba(9, 30, 66, 0.16)",
      md: "0 4px 8px rgba(9, 30, 66, 0.24)",
      lg: "0 8px 16px rgba(9, 30, 66, 0.32)",
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    fontSize: {
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "20px",
      "2xl": "24px",
    },
    extend: {
      minHeight: {
        // a11y.buttonMinHeight from get-theme — required touch target for interactive elements
        touch: "44px",
      },
    },
  },
  plugins: [],
};
