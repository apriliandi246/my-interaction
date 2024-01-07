import Interaction from "../../package/interaction/index.js";

const CONTROLLER_NAME = "dropdown";

const dataSchema = {
	controller: "data-interaction-controller",
	target: `data-${CONTROLLER_NAME}-target`,
	event: `data-${CONTROLLER_NAME}-event`
};

class Dropdown {
	constructor() {
		this.isShow = false;

		this.clickOutside();
		this.escapeClose();
	}

	static targets = ["content"];

	clickOutside() {
		document.documentElement.addEventListener("click", (event) => {
			const eventTargetElement = event.target;

			if (eventTargetElement !== this.eventElement && this.isShow === true) {
				if (this.contentElement) {
					this.contentElement.style.setProperty("display", "none");
					this.isShow = false;
				}

				if (this.contentElements) {
					this.contentElements[0].style.setProperty("display", "none");
					this.contentElements[1].style.setProperty("display", "none");
					this.isShow = false;
				}
			}
		});
	}

	escapeClose() {
		document.documentElement.addEventListener("keydown", (event) => {
			const keyboardKey = event.key;

			if (keyboardKey === "Escape" && this.isShow === true) {
				if (this.contentElement) {
					this.contentElement.style.setProperty("display", "none");
					this.isShow = false;
				}

				if (this.contentElements) {
					this.contentElements[0].style.setProperty("display", "none");
					this.contentElements[1].style.setProperty("display", "none");
					this.isShow = false;
				}
			}
		});
	}

	toggle() {
		if (this.isShow === false) {
			if (this.contentElement) {
				this.contentElement.style.removeProperty("display");
				this.isShow = true;
			}

			if (this.contentElements) {
				this.contentElements[0].style.removeProperty("display");
				this.contentElements[1].style.removeProperty("display");
				this.isShow = true;
			}
		} else {
			if (this.contentElement) {
				this.contentElement.style.setProperty("display", "none");
				this.isShow = false;
			}

			if (this.contentElements) {
				this.contentElements[0].style.setProperty("display", "none");
				this.contentElements[1].style.setProperty("display", "none");
				this.isShow = false;
			}
		}
	}

	doubleClick() {
		console.log("double click triggered");
	}
}

new Interaction(CONTROLLER_NAME, dataSchema, Dropdown);
