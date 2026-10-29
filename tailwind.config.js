/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Add this for class-based dark mode
  theme: {
    extend: {
      colors: {
        // Your color definitions
        primary: '#7280ec',
        danger: '#ff7782',
        success: '#41f1b6',
        warning: '#ffbb55',
        accent: '#1CB698', // Your main brand color
        background: {
          1: '#FBF6F6', // Light mode
          2: '#fbf6f6',
          3: '#FBECD7',
        },
        dark: {
          // Dark mode colors
          background: {
            1: '#1e2326',
            2: '#252A2E',
            3: '#252a2e',
          },
         
          
        },
        text: {
          light: '#333333', // Dark text for light mode
          dark: '#ffffff',  // White text for dark mode
        }
      },
      fontFamily: {
        righteous: ['Righteous', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        // For skills animation
        PHP: {
          '0%': { width: '0%' },
          '100%': { width: '75%' },
        },
        htmlcss: {
          '0%': { width: '0%' },
          '100%': { width: '80%' },
        },
        Javascript: {
          '0%': { width: '0%' },
          '100%': { width: '80%' },
        },
        SQL: {
          '0%': { width: '0%' },
          '100%': { width: '70%' },
        },
        REDES: {
          '0%': { width: '0%' },
          '100%': { width: '80%' },
        },
        comunicacion: {
          '0%': { width: '0%' },
          '100%': { width: '80%' },
        },
        trabajo: {
          '0%': { width: '0%' },
          '100%': { width: '70%' },
        },
        creatividad: {
          '0%': { width: '0%' },
          '100%': { width: '60%' },
        },
        dedicacion: {
          '0%': { width: '0%' },
          '100%': { width: '99%' },
        },
        proyect: {
          '0%': { width: '0%' },
          '100%': { width: '94%' },
        },
      },
      width: {
        '94': '94%', // Custom width for project management skill
      },
      transitionDuration: {
        '2000': '2000ms', // For skills animation duration
      },
    },
  },
  plugins: [],
}