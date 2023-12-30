import { Interaction } from "../core/interact.js";

class Counter {
	constructor() {
		this.count = 0;
	}

	static targets = "result";

	increase() {
		this.count++;
		this.targetElement.textContent = this.count;
	}
}

new Interaction("counter", Counter);
