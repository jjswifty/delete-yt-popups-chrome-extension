import { defineManifest } from "@crxjs/vite-plugin";

const assetsPath = 'src/shared/assets'

export default defineManifest(async () => ({
	manifest_version: 3,
	name: "Yt popup deleter",
	description: "Sick of this shitty end cards on YouTube? Here is solution.",
	version: "1.0.0",
	content_scripts: [
		{
			all_frames: true,
			matches: ['https://*.youtube.com/*'],
			js: ['src/index.ts'],
			run_at: 'document_start'
		}
	],
	icons: {
		16: `${assetsPath}/logo-16.png`,
		32: `${assetsPath}/logo-32.png`,
		128: `${assetsPath}/logo-128.png`
	},
	action: {
		default_popup: 'popup.html'
	}
}))