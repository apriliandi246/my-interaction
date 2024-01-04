import { Interaction } from "../../core/interact.js";

const CONTROLLER_NAME = "alert";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Alert {
	close(event) {
		this.controllerElement.remove();
		console.log(event.eventParams);
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Alert);
