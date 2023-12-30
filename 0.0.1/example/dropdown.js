import { Interaction } from "../core/interact.js";

const CONTROLLER_NAME = "dropdown";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Dropdown {
	constructor() {
		this.isShow = false;
	}

	static targets = "content";

	toggle() {
		if (this.isShow === false) {
			this.targetElement.style.removeProperty("display");
			this.isShow = true;
		} else {
			this.targetElement.style.setProperty("display", "none");
			this.isShow = false;
		}
	}
}

new Interaction(CONTROLLER_NAME, Dropdown, dataSchema);
