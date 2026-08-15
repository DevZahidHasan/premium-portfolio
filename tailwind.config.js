/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        interaction: "var(--interaction)",
        selection: "var(--selection)",
        cursor: "var(--cursor)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-label)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        "page-gutter": "var(--page-gutter)",
        "section-spacing": "var(--section-spacing)",
        "grid-gap": "var(--grid-gap)",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
}
