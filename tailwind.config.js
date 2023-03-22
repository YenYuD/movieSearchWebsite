/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                snackbarMoving: {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0px)" },
                },
            },
            animation: {
                snackbar: "snackbarMoving .5s ease-in-out ",
            },
        },
    },
    plugins: [],
};
