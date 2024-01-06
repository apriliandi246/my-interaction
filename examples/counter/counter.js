import Interaction from "../../package/interaction/index.js";

const CONTROLLER_NAME = "counter";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Counter {
	constructor() {
		this.count = 0;

		console.log(this);
	}

	static targets = ["result", "result_2"];

	increase() {
		this.count++;
		this.resultElement.textContent = this.count;

		if (this.result_2Element) {
			this.result_2Element.textContent = this.count;
		}
	}

	print(event) {
		console.log(event.target);
	}

	keyboard(event) {
		console.log(event.target);
	}

	cursorIn(event) {
		console.log(event.target);
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Counter);
