/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme'); // Import default theme

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add custom font families
      fontFamily: {
        // Use Inter as primary, fallback to system UI fonts (similar to San Francisco)
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'var(--font-noto-sans-kr)'],
      },
      colors: {
        // Apple-inspired color palette
        primary: '#4F46E5',
        'primary-dark': '#4338CA',
        secondary: { // Muted blue or gray for secondary elements
            DEFAULT: '#8A8A8E', // Mid Gray
            hover: '#A0A0A5'
        },
        accent: { // Could be another accent like orange or keep it muted
            DEFAULT: '#F5A623', // Orange example
            hover: '#F7B54E'
        },
        gray: {
          DEFAULT: '#8A8A8E', // Base gray for text
          100: '#F5F5F7', // Light background
          200: '#E5E5EA', // Borders / Dividers
          300: '#D1D1D6', // Medium light gray
          400: '#C7C7CC',
          500: '#A0A0A5', // Secondary text
          600: '#8A8A8E', // Standard text
          700: '#636366', // Darker text
          800: '#3A3A3C', // Even darker
          900: '#1D1D1F', // Near black for headings
        },
        // Replacing previous fixed colors with the new palette
        // primary: '#007AFF',
        // secondary: '#8A8A8E',
        // accent: '#F5A623', // Example orange
      },
      borderRadius: { // Apple often uses specific border radiuses
        'xl': '12px', // Example
        'lg': '8px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
} 