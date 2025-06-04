/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        unleash: '#6C65E5',
        web: '#1A4049',
        orange: '#D87529'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out forwards',
        expand: 'expand 0.5s ease-in-out forwards',
        expandHorizontal: 'expandHorizontal 0.5s ease-in-out forwards',
        fadeInUp: 'fadeInUp 0.3s ease-in-out forwards',
        bounceSlightly: 'bounceSlightly 0.8s ease-in-out 0.3s infinite'
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
        },
        bounceSlightly: {
          '0%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
          '50%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '100%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      }
    }
  },
  plugins: []
}
