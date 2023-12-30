import { Interaction } from "../core/interact.js";

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

const CONTROLLER_NAME = "dropdown";

const dataSchema = {
	controller: "data-controller",
	target: "data-target",
	event: "data-event",
};

new Interaction(CONTROLLER_NAME, Dropdown, dataSchema);
