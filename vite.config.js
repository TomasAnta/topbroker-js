import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "./",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                flats: resolve(__dirname, "views/flats.html"),
                houses: resolve(__dirname, "views/houses.html"),
                sites: resolve(__dirname, "views/sites.html"),
                estate: resolve(__dirname, "views/estate.html"),
            },
        },
    },
    publicDir: "public",
    css: {
        preprocessorOptions: { scss: {} },
    },
});
