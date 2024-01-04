import { Interaction } from "../../core/interact.js";

const CONTROLLER_NAME = "accordion";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`,
};

class Accordion {
	constructor() {
		this.currentAccordionActive = -1;
		this.contentIdDataAttr = "data-content_id";
	}

	static targets = ["accordionContent"];

	toggle({ eventParams }) {
		const accordionContentId = parseInt(eventParams.content_id);
		const currentContentElement = this.accordionContentElements[accordionContentId];

		if (this.currentAccordionActive === -1) {
			currentContentElement.style.removeProperty("display");
			this.currentAccordionActive = accordionContentId;

			return;
		}

		if (this.currentAccordionActive === accordionContentId) {
			currentContentElement.style.setProperty("display", "none");
			this.currentAccordionActive = -1;

			return;
		}

		if (this.currentAccordionActive !== accordionContentId) {
			const prevContentElement = this.accordionContentElements[this.currentAccordionActive];

			prevContentElement.style.setProperty("display", "none");
			currentContentElement.style.removeProperty("display");

			this.currentAccordionActive = accordionContentId;

			return;
		}
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Accordion);
