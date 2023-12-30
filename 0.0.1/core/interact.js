export class Interaction {
	constructor(controllerName, Controller, dataScheme) {
		this.controllerElements;
		this.Controller = Controller;
		this.controllerName = controllerName;

		this.dataScheme = dataScheme;
		this.targetIdentifier = Controller.targets;

		this.main();
	}

	main() {
		this.setControllerElements();
		this.setControllerData();
	}

	setControllerElements() {
		const selector = `[${this.dataScheme.controller}="${this.controllerName}"]`;
		const elements = document.querySelectorAll(selector);

		this.controllerElements = Array.from(elements);
	}

	findTargetElement(controllerElement) {
		const selector = `[${this.dataScheme.target}="${this.targetIdentifier}"]`;
		const element = controllerElement.querySelector(selector);

		return element;
	}

	findActionElement(controllerElement) {
		const selector = `[${this.dataScheme.event}]`;
		const element = controllerElement.querySelector(selector);
		const actionElementData = element.getAttribute(this.dataScheme.event).split("->");
		const eventName = actionElementData[0];
		const listenerName = actionElementData[1];

		return { actionElement: element, eventName, listenerName };
	}

	setControllerData() {
		for (let controllerIdx = 0; controllerIdx < this.controllerElements.length; controllerIdx++) {
			const controllerElement = this.controllerElements[controllerIdx];
			const targetElement = this.findTargetElement(controllerElement);
			const { actionElement, eventName, listenerName } = this.findActionElement(controllerElement);

			this.Controller.prototype.controllerName = this.controllerName;

			const controllerInstance = new this.Controller();
			controllerInstance.targetElement = targetElement;
			controllerInstance.controllerElement = controllerElement;

			actionElement.addEventListener(eventName, (event) => {
				controllerInstance[listenerName](event);
			});
		}
	}
}

const data = "click->element->methodName";
