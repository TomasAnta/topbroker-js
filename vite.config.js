import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist", // keep inside project root
        emptyOutDir: true,
    },
    publicDir: "public", // default; no “../”
    css: {
        preprocessorOptions: { scss: {} },
    },
});
