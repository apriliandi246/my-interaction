import Interaction from "interaction";

const CONTROLLER_NAME = "collabsible";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`
};

class Collabsible {
	constructor() {
		this.activeCollapsibles = [];
	}

	static targets = ["collabsibleContent"];

	toggle({ eventParams }) {
		const collabsiblenContentId = parseInt(eventParams.content_id);
		const currentContentElement = this.collabsibleContentElements[collabsiblenContentId];

		if (this.activeCollapsibles.includes(collabsiblenContentId) === false) {
			currentContentElement.style.removeProperty("display");
			this.activeCollapsibles.push(collabsiblenContentId);

			return;
		}

		if (this.activeCollapsibles.includes(collabsiblenContentId) === true) {
			const filteredCollabsible = this.activeCollapsibles.filter((val) => val !== collabsiblenContentId);

			currentContentElement.style.setProperty("display", "none");
			this.activeCollapsibles = filteredCollabsible;

			return;
		}
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Collabsible);
