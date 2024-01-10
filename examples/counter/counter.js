import Interaction from "interaction";

class Counter {
	constructor() {
		this.count = 0;
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

new Interaction("counter", Counter);
