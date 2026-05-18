import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d2438",
        cloud: "#f7fbff",
        mist: "#e8f5ff",
        skyline: "#58b7ff",
        lagoon: "#0f92d4",
        navy: "#123a63"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(53, 153, 220, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
