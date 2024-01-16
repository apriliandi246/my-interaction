import { screen, fireEvent, prettyDOM } from "@testing-library/dom";
import "@testing-library/jest-dom";

import Interaction from "../index.js";

test("identified the controller name", () => {
	const controllerName = "heading";
	const htmlTags = `
		<div data-interaction-controller="${controllerName}">
			<h1>Hello World</h1>
		</div>
	`;

	document.body.innerHTML = htmlTags;

	class Heading {}

	new Interaction(controllerName, Heading);

	expect(Heading.prototype.controllerName).toBe(controllerName);
});

test("the `span` element text value is increased after click the button", () => {
	const controllerName = "counter";
	const htmlTags = `
		<div data-interaction-controller="${controllerName}">
			<button type="button" data-counter-event="click->increase">
				increase one
			</button>

			<span data-counter-target="result">0</span>
		</div>
	`;

	document.body.innerHTML = htmlTags;

	class Counter {
		constructor() {
			this.count = 0;
		}

		static targets = ["result"];

		increase() {
			this.count++;
			this.resultElement.textContent = this.count;
		}
	}

	new Interaction(controllerName, Counter);

	const btnElement = screen.getByRole("button", { name: "increase one" });

	fireEvent.click(btnElement);

	const resultElement = screen.getByText("1");

	expect(resultElement).toBeInTheDocument();
});
