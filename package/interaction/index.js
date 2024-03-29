import getDefaultDataSchema from "./default_data_schema.js";

class Interaction {
	/**
	 * @param {string} controllerName
	 * @param {Class} Controller
	 * @param {object} dataScheme
	 */
	constructor(controllerName, Controller, dataScheme = getDefaultDataSchema(controllerName)) {
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

	/**
	 * @param {HTMLElement} controllerElement
	 * @param {Controller} controllerInstance
	 */
	setTargetElements(controllerElement, controllerInstance) {
		const selectedTargetElements = [];

		if (this.targetIdentifier !== undefined && this.targetIdentifier.length > 0) {
			for (let targetIdx = 0; targetIdx < this.targetIdentifier.length; targetIdx++) {
				const targetIdentifier = this.targetIdentifier[targetIdx];
				const selector = `[${this.dataScheme.target}=${targetIdentifier}]`;
				const elements = controllerElement.querySelectorAll(selector);

				for (let elementIdx = 0; elementIdx < elements.length; elementIdx++) {
					const element = elements[elementIdx];
					const controllerElementSelector = `[${this.dataScheme.controller}="${this.controllerName}"]`;
					const controllerElementScope = element.closest(controllerElementSelector);

					if (controllerElementScope === controllerElement) {
						selectedTargetElements.push(element);
					}
				}

				if (selectedTargetElements.length === 1) {
					const eventElementPropertyName = `${targetIdentifier}Element`;
					controllerInstance[eventElementPropertyName] = selectedTargetElements[0];
				}

				if (selectedTargetElements.length > 1) {
					const eventElementPropertyName = `${targetIdentifier}Elements`;
					controllerInstance[eventElementPropertyName] = selectedTargetElements;
				}
			}
		}
	}

	/**
	 * @param {HTMLElement} controllerElement
	 * @param {Controller} controllerInstance
	 */
	setEventListeners(controllerElement, controllerInstance) {
		const selectedEventElements = [];
		const selector = `[${this.dataScheme.event}]`;
		const elements = controllerElement.querySelectorAll(selector);

		for (let elementIdx = 0; elementIdx < elements.length; elementIdx++) {
			const element = elements[elementIdx];
			const eventListners = element.getAttribute(this.dataScheme.event).split(" ");
			const controllerElementScope = element.closest(`[${this.dataScheme.controller}="${this.controllerName}"]`);

			if (controllerElementScope === controllerElement) {
				selectedEventElements.push(element);

				for (let eventListenerIdx = 0; eventListenerIdx < eventListners.length; eventListenerIdx++) {
					const actionElementData = eventListners[eventListenerIdx].split("->");
					const eventName = actionElementData[0];
					const listenerName = actionElementData[1];
					const eventParameters = this.getEventParameters(element);

					element.addEventListener(eventName, (event) => {
						event["eventParams"] = eventParameters;
						controllerInstance[listenerName](event);
					});
				}
			}
		}

		if (selectedEventElements.length === 1) {
			const targetPropertyName = "eventElement";
			controllerInstance[targetPropertyName] = selectedEventElements[0];
		}

		if (selectedEventElements.length > 1) {
			const targetPropertiesName = "eventElements";
			controllerInstance[targetPropertiesName] = selectedEventElements;
		}
	}

	/**
	 * @param {HTMLElement} eventElement
	 * @returns {object}
	 */
	getEventParameters(eventElement) {
		const parameters = {};
		const dataAttrPattern = new RegExp(`^data-${this.controllerName}-(.+)-param$`, "i");
		const datasetAttributes = Array.from(eventElement.attributes);

		for (const datasetAttribute of datasetAttributes) {
			const { name, value } = datasetAttribute;

			const match = name.match(dataAttrPattern);
			const paramKey = match && match[1];

			if (paramKey) {
				parameters[paramKey] = value;
			}
		}

		return parameters;
	}

	setControllersData() {
		for (let controllerIdx = 0; controllerIdx < this.controllerElements.length; controllerIdx++) {
			const controllerElement = this.controllerElements[controllerIdx];

			/* Add "controllerName" property to the prototype */
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

export default Interaction;
