// import adapter from "@sveltejs/adapter-auto";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            "@": "./src"
        },
        files: {
            hooks: {
                server: "src/hooks/hooks.server"
            }
        }
    }
};

export default config;
