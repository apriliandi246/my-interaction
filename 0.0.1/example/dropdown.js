import { Interaction } from "../core/interact.js";

const CONTROLLER_NAME = "dropdown";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Dropdown {
	constructor() {
		this.isShow = true;

		console.log(this);
	}

	static targets = ["content"];

	toggle() {
		if (this.isShow === false) {
			if (this.contentElement) {
				this.contentElement.style.removeProperty("display");
				this.isShow = true;
			}

			if (this.contentElements) {
				this.contentElements[0].style.removeProperty("display");
				this.contentElements[1].style.removeProperty("display");
				this.isShow = true;
			}
		} else {
			if (this.contentElement) {
				this.contentElement.style.setProperty("display", "none");
				this.isShow = false;
			}

			if (this.contentElements) {
				this.contentElements[0].style.setProperty("display", "none");
				this.contentElements[1].style.setProperty("display", "none");
				this.isShow = false;
			}
		}
	}
}

new Interaction(CONTROLLER_NAME, Dropdown, dataSchema);
