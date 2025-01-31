/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        // Background colors
        background: {
          primary: '#FFFFFF', // White for main content
          secondary: '#F8FAFC', // Light gray for sections
          tertiary: '#F1F5F9', // Slightly darker gray
          sidebar: '#0F172A', // Darker background for more contrast
        },
        // Status colors
        status: {
          pending: '#FCD34D', // Yellowish
          take: '#A78BFA', // Purplish
          callAgain: '#86EFAC', // Slightly faded green
          confirmed: '#4ADE80', // Bright green
          shipped: '#94A3B8', // Greyish faded
          returned: '#FDA4AF', // Pinkish faded
          paid: '#059669', // Deep strong green
          trashed: '#475569', // Bold grey
          cancelled: '#DC2626', // Strong red
        },
        brand: {
          soul: '#F97316', // Vibrant orange
          fusion: '#FB923C', // Softer orange
        },
        // Primary colors
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Secondary colors
        secondary: {
          DEFAULT: '#64748B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Action colors
        action: {
          DEFAULT: '#059669',
          light: '#34D399',
          dark: '#047857',
        },
        // Error colors
        error: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
          dark: '#B91C1C',
        },
        // Warning colors
        warning: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          dark: '#B45309',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
