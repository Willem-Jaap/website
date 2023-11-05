/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        fontSize: {
            'sm': 'clamp(0.8rem, 0.7667rem + 0.1111vw, 0.9rem)',
            'base': 'clamp(0.9rem, 0.8667rem + 0.1111vw, 1rem)',
            'lg': 'clamp(1rem, 0.9667rem + 0.1111vw, 1.1rem)',
            'xl': 'clamp(1.1rem, 1.0333rem + 0.2222vw, 1.3rem)',
            '2xl': 'clamp(1.3rem, 1.2rem + 0.3333vw, 1.6rem)',
            '3xl': 'clamp(1.5rem, 1.3667rem + 0.4444vw, 1.9rem)',
            '4xl': 'clamp(1.8rem, 1.6rem + 0.6667vw, 2.4rem)',
            '5xl': 'clamp(2rem, 1.6667rem + 1.1111vw, 3rem)',
            '6xl': 'clamp(2.3rem, 1.8rem + 1.6667vw, 3.8rem)',
        },
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
                    600: '#26252D',
                    700: '#1F1E24',
                    800: '#18171C',
                    900: '#111014',
                    950: '#0D0D0F',
                },
            },
            padding: {
                'column-1': 'clamp(2rem, -5.3333rem + 24.4444vw, 10rem);',
            },
            margin: {
                'column-1': 'clamp(2rem, -5.3333rem + 24.4444vw, 10rem);',
            },
            typography: theme => ({
                charade: {
                    css: {
                        '--tw-prose-headings': theme('colors.charade.50'),
                        '--tw-prose-body': theme('colors.charade.400'),
                        '--tw-prose-bold': theme('colors.charade.300'),
                    },
                },
            }),
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
                'noise': {
                    '0%': {
                        transform: 'translate3d(0, 9rem, 0)',
                    },

                    '10%': {
                        transform: 'translate3d(-1rem, -4rem, 0)',
                    },

                    '20%': {
                        transform: 'translate3d(-8rem, 2rem, 0)',
                    },

                    '30%': {
                        transform: 'translate3d(9rem, -9rem, 0)',
                    },

                    '40%': {
                        transform: 'translate3d(-2rem, 7rem, 0)',
                    },

                    '50%': {
                        transform: 'translate3d(-9rem, -4rem, 0)',
                    },

                    '60%': {
                        transform: 'translate3d(2rem, 6rem, 0)',
                    },

                    '70%': {
                        transform: 'translate3d(7rem, -8rem, 0)',
                    },

                    '80%': {
                        transform: 'translate3d(-9rem, 1rem, 0)',
                    },

                    '90%': {
                        transform: 'translate3d(6rem, -5rem, 0)',
                    },

                    '100%': {
                        transform: 'translate3d(-7rem, 0, 0)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'noise': 'noise 3s steps(2) infinite',
            },
            backgroundImage: {
                'noise': 'url("/assets/images/noise.png")',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
