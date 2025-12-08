import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fff0f0',
                    100: '#ffdede',
                    200: '#ffc2c2',
                    300: '#ff9696',
                    400: '#ff5c5c',
                    500: '#9E1C20', /* BLEEDING RED - MAIN */
                    600: '#8a181c',
                    700: '#701316',
                    800: '#520e10',
                    900: '#33080a',
                    950: '#1a0405',
                },
                accent: {
                    500: '#71717a', /* Zinc 500 */
                    600: '#52525b', /* Zinc 600 */
                },
                slate: {
                    800: '#27272a', /* Zinc 800 */
                    900: '#18181b', /* Zinc 900 */
                    950: '#09090b', /* Zinc 950 - Sharp Black */
                }
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
