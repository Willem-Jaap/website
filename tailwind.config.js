/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                charade: {
                    default: '#2D2C35',
                    50: '#E7E6EA',
                    100: '#D1CFD8',
                    200: '#A5A2B3',
                    300: '#7A768F',
                    400: '#545062',
                    500: '#2D2C35',
                    600: '#24222A',
                    700: '#1A191F',
                    800: '#111014',
                    900: '#070708',
                    950: '#020203',
                },
            },
        },
    },
    plugins: [],
};
