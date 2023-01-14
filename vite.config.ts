import { defineConfig } from 'vite'
import { crx } from "@crxjs/vite-plugin";

import manifest from './manifest.config'
import checker from "vite-plugin-checker";

export default defineConfig({
	plugins: [
		crx({
			manifest,
		}),
		checker({
			typescript: true,
		}),
	],
})