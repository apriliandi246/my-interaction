import { Interaction } from "../core/interact.js";

const CONTROLLER_NAME = "counter";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Counter {
	constructor() {
		this.count = 0;
	}

	static targets = ["result"];

	increase() {
		this.count++;
		this.resultElement.textContent = this.count;
	}
}

new Interaction(CONTROLLER_NAME, Counter, dataSchema);
