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
            fontSize: {
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.563rem',
                '3xl': '1.938rem',
                '4xl': '2.438rem',
                '5xl': '3rem',
                '6xl': '3.813rem',
            },
            padding: {
                'column-1': 'clamp(2rem, -5.3333rem + 24.4444vw, 13rem);',
            },
        },
    },
    plugins: [],
};
