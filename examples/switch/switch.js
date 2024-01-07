import Interaction from "../../package/interaction/index.js";

const CONTROLLER_NAME = "switch";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`
};

class Switch {
	constructor() {
		this.isOn = false;
	}

	toggle() {
		if (this.isOn === false) {
			this.isOn = true;
			this.eventElement.setAttribute("aria-checked", "true");
		} else {
			this.isOn = false;
			this.eventElement.setAttribute("aria-checked", "false");
		}
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Switch);
