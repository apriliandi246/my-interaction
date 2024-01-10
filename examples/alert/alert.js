import Interaction from "interaction";

const CONTROLLER_NAME = "alert";

const dataSchema = {
	controller: `data-${CONTROLLER_NAME}-controller`,
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`
};

class Alert {
	close() {
		this.controllerElement.remove();
	}
}

new Interaction("alert", Alert, dataSchema);
