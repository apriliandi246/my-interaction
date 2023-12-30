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

	findTargetElements(controllerElement, targetIdentifier) {
		const selectedTargetElements = [];
		const selector = `[${this.dataScheme.target}="${targetIdentifier}"]`;
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

			return {
				targetProperty: targetProperty,
				elements: selectedTargetElements[0],
			};
		}

		if (selectedTargetElements.length > 1) {
			const targetProperty = `${targetIdentifier}Elements`;

			return {
				targetProperty: targetProperty,
				elements: selectedTargetElements,
			};
		}
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

			for (let targetIdx = 0; targetIdx < this.targetIdentifier.length; targetIdx++) {
				const { actionElement, eventName, listenerName } = this.findActionElement(controllerElement);
				const { targetProperty, elements } = this.findTargetElements(controllerElement, this.targetIdentifier[targetIdx]);

				this.Controller.prototype.controllerName = this.controllerName;

				const controllerInstance = new this.Controller();
				controllerInstance[targetProperty] = elements;
				controllerInstance.controllerElement = controllerElement;

				actionElement.addEventListener(eventName, (event) => {
					controllerInstance[listenerName](event);
				});
			}
		}
	}
}

const data = "click->element->methodName";
