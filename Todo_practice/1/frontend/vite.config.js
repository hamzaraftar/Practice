import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // allows access from network
    port: 3000,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "192.168.1.105",
      "centric-candra-nontransparent.ngrok-free.dev", // <-- add your ngrok URL here
    ],
  },
});
