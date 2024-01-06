import { Interaction } from "../../0.0.1/core/interact.js";

const CONTROLLER_NAME = "alert";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Alert {
	close(event) {
		this.controllerElement.remove();
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Alert);
