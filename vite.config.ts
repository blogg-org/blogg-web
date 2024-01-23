import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/",
    preview: {
        port: 5173,
        strictPort: true,
    },
    server: {
        port: 5173,
        strictPort: true,
        host: true,
        origin: "http://localhost:5173",
    },
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "./src/api/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@config": path.resolve(__dirname, "./src/config/"),
            "@form-validations": path.resolve(
                __dirname,
                "./src/form-validations/"
            ),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@pages": path.resolve(__dirname, "./src/pages/"),
            "@store": path.resolve(__dirname, "./src/store/"),
        },
    },
});
