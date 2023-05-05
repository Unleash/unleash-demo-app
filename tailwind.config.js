/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        unleash: '#6C65E5',
        web: '#1A4049'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out forwards',
        expand: 'expand 0.5s ease-in-out forwards',
        expandHorizontal: 'expandHorizontal 0.5s ease-in-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-in-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        expand: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { height: 'scaleY(1)', transformOrigin: 'bottom' }
        },
        expandHorizontal: {
          '0%': { maxWidth: '0%' },
          '100%': { maxWidth: '100%' }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        }
      }
    }
  },
  plugins: []
}
