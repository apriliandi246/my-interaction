import Interaction from "interaction";

class Switch {
	constructor() {
		this.isOn = false;
	}

	toggle() {
		if (this.isOn === false) {
			this.isOn = true;
			this.eventElement.setAttribute("aria-checked", "true");
		} else {
			this.isOn = false;
			this.eventElement.setAttribute("aria-checked", "false");
		}
	}
}

new Interaction("switch", Switch);
