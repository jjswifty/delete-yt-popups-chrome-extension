import { waitForElementToRender } from "./shared/utils";
import { ANNOYING_POPUP_CLASS, YOUTUBE_PLAYER_ID } from "./shared/constants";

(async () => {
	const player =
		await waitForElementToRender(YOUTUBE_PLAYER_ID) as HTMLElement

	const initConfig: MutationObserverInit = {
		subtree: true,
		childList: true,
	}

	const observer = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				if (mutation.addedNodes.length) {
					mutation.addedNodes.forEach(node => {
						if (node instanceof HTMLDivElement && node.classList.contains(ANNOYING_POPUP_CLASS)) {
							node.remove()
							console.log('Удалили очередной надоедливый попап в конце видео.')
						}
					})
				}
			}
		}
	})

	observer.observe(player, initConfig)
})()
