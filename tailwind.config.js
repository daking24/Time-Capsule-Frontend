/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                royal: {
                    purple: '#2E0249',
                    deep: '#1A002E', // Even darker purple for gradients
                    gold: '#FFD700',
                    amber: '#F6C90E',
                    text: '#F5F5F5',
                    muted: '#A9A9A9',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'], // For readable body text
            },
            backgroundImage: {
                'royal-gradient': 'linear-gradient(135deg, #2E0249 0%, #1A002E 100%)',
                'glass': 'rgba(255, 255, 255, 0.05)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
