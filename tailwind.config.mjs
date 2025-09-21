/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // The Architect theme palette
        'blueprint': '#0A1828',
        'blueprint-light': '#1A2A3A',
        'blueprint-dark': '#051018',
        'technical-gray': '#D1D5DB',
        'technical-gray-light': '#F3F4F6',
        'technical-gray-dark': '#9CA3AF',
        'amber': '#F59E0B',
        'amber-light': '#FCD34D',
        'amber-dark': '#D97706',
        // Extended palette for variations
        'blueprint-50': '#EFF6FF',
        'blueprint-100': '#DBEAFE',
        'blueprint-200': '#BFDBFE',
        'blueprint-300': '#93C5FD',
        'blueprint-400': '#60A5FA',
        'blueprint-500': '#3B82F6',
        'blueprint-600': '#2563EB',
        'blueprint-700': '#1D4ED8',
        'blueprint-800': '#1E40AF',
        'blueprint-900': '#1E3A8A',
        // Neutral grays for text and backgrounds
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}