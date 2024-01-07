import Interaction from "../../package/interaction/index.js";

const CONTROLLER_NAME = "tabs";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`
};

class Tabs {
	constructor() {
		this.activeTabId = 0;
	}

	static targets = ["tabContent"];

	open(event) {
		const tabId = parseInt(event.eventParams.tab_id);
		const btnElement = this.eventElements[tabId];
		const tabContentElement = this.tabContentElements[tabId];

		if (this.activeTabId !== tabId) {
			const prevBtnElement = this.eventElements[this.activeTabId];
			const prevTabContentElement = this.tabContentElements[this.activeTabId];

			prevBtnElement.setAttribute("aria-selected", "false");
			prevBtnElement.setAttribute("tabindex", "-1");

			btnElement.removeAttribute("tabindex");
			btnElement.setAttribute("aria-selected", "true");

			prevTabContentElement.style.setProperty("display", "none");
			tabContentElement.style.removeProperty("display");

			this.activeTabId = tabId;
		}
	}

	navigate(event) {
		const keyboardKey = event.key;
		const tabId = parseInt(event.eventParams.tab_id);
		const totalTabs = this.tabContentElements.length - 1;

		const btnElement = this.eventElements[tabId];
		const tabContentElement = this.tabContentElements[tabId];

		if (keyboardKey === "ArrowLeft") {
			if (tabId !== 0) {
				const prevTabId = tabId - 1;
				const prevBtnElement = this.eventElements[prevTabId];
				const prevTabContentElement = this.tabContentElements[prevTabId];

				btnElement.setAttribute("aria-selected", "false");
				btnElement.setAttribute("tabindex", "-1");

				prevBtnElement.removeAttribute("tabindex");
				prevBtnElement.setAttribute("aria-selected", "true");
				prevBtnElement.focus();

				tabContentElement.style.setProperty("display", "none");
				prevTabContentElement.style.removeProperty("display");

				this.activeTabId = prevTabId;
			}
		}

		if (keyboardKey === "ArrowRight") {
			if (tabId !== totalTabs) {
				const nextTabId = tabId + 1;
				const nextBtnElement = this.eventElements[nextTabId];
				const nextTabContentElement = this.tabContentElements[nextTabId];

				btnElement.setAttribute("aria-selected", "false");
				btnElement.setAttribute("tabindex", "-1");

				nextBtnElement.removeAttribute("tabindex");
				nextBtnElement.setAttribute("aria-selected", "true");
				nextBtnElement.focus();

				tabContentElement.style.setProperty("display", "none");
				nextTabContentElement.style.removeProperty("display");

				this.activeTabId = nextTabId;
			}
		}
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Tabs);
