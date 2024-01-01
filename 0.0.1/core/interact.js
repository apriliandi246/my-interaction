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
		this.setControllersData();
	}

	setControllerElements() {
		const selector = `[${this.dataScheme.controller}="${this.controllerName}"]`;
		const elements = document.querySelectorAll(selector);

		this.controllerElements = Array.from(elements);
	}

	setTargetElements(controllerElement, controllerInstance) {
		let selectedTargetElements = [];

		if (this.targetIdentifier !== undefined && this.targetIdentifier.length > 0) {
			for (let targetIdx = 0; targetIdx < this.targetIdentifier.length; targetIdx++) {
				const targetIdentifier = this.targetIdentifier[targetIdx];
				const selector = `[${this.dataScheme.target}=${targetIdentifier}]`;
				const elements = controllerElement.querySelectorAll(selector);

				for (let elementIdx = 0; elementIdx < elements.length; elementIdx++) {
					const element = elements[elementIdx];
					const controllerElementScope = element.closest(`[${this.dataScheme.controller}="${this.controllerName}"]`);

					if (controllerElementScope === controllerElement) {
						selectedTargetElements.push(element);
					}
				}

				if (selectedTargetElements.length === 1) {
					const targetProperty = `${targetIdentifier}Element`;

					controllerInstance[targetProperty] = selectedTargetElements[0];
				}

				if (selectedTargetElements.length > 1) {
					const targetProperty = `${targetIdentifier}Elements`;

					controllerInstance[targetProperty] = selectedTargetElements;
				}

				selectedTargetElements = [];
			}
		}
	}

	setEventListeners(controllerElement, controllerInstance) {
		const selector = `[${this.dataScheme.event}]`;
		const elements = controllerElement.querySelectorAll(selector);

		for (let elementIdx = 0; elementIdx < elements.length; elementIdx++) {
			const element = elements[elementIdx];
			const eventListners = element.getAttribute(this.dataScheme.event).split(" ");
			const controllerElementScope = element.closest(`[${this.dataScheme.controller}="${this.controllerName}"]`);

			if (controllerElementScope === controllerElement) {
				for (let eventListenerIdx = 0; eventListenerIdx < eventListners.length; eventListenerIdx++) {
					const actionElementData = eventListners[eventListenerIdx].split("->");
					const eventName = actionElementData[0];
					const listenerName = actionElementData[1];

					element.addEventListener(eventName, (event) => {
						controllerInstance[listenerName](event);
					});
				}
			}
		}
	}

	setControllersData() {
		for (let controllerIdx = 0; controllerIdx < this.controllerElements.length; controllerIdx++) {
			const controllerElement = this.controllerElements[controllerIdx];

			this.Controller.prototype.controllerName = this.controllerName;

			const controllerInstance = new this.Controller();
			controllerInstance.controllerElement = controllerElement;

			/* Set target elements */
			this.setTargetElements(controllerElement, controllerInstance);

			/* Set event listeners */
			this.setEventListeners(controllerElement, controllerInstance);
		}
	}
}
