<h1 align="center">🏗️ my-interaction</h1>

<br>

### 👨‍💻 About

Library to make HTML more declarative and make easy to interact with DOM....

<h3 align="center">. . .</h3>

### 🧩 How to use it

- **Controller**
	* Basically, controller is just container wrapper and element inside the controller can use the features

		```html
		<div data-interaction-controller="[controller name]">
		</div>
		```

	* You can access some data related to controller by accessing `this` inside your controller class
		* `controllerName` - property to get the controller name
		* `controllerElement` - property to get controller element

<br>

- **Event listener**
   * `data-[controllerName]-event="[eventName]->listenerName"`
	* `<button data-[controllerName]-event="click->toggle">Click Me</button>`
	* You can access elements that have event listener by accessing `this` inside your controller class
		* `eventElement` - property when just element
		* `eventElements` - proerty when elements more than one and store in array

<br>

- **Multiple event listeners**
	* Just seperate the events using space
	* `<button data-[controllerName]-event="click->toggle keydown->keyboardNav">Click Me</button>`

<br>

- **Target elements**
	* `static targets = ["targetElement"];` - Use static property inside your controller class
	* `data-accordion-target="dataContent"` - Define the target element
	* You can access target elements by accessing `this` inside your controller class
		* `[targetName]Element` - property when just element
		* `[targetName]Elements` - proerty when elements more than one and store in array

<br>

- **Event Parameters**
	* `data-[controllerName]-[parameter_name]-param="[parameter value]"`
	* Example - `<button data-alert-event="click->close" data-alert-alert_id-param="24">X</button>`
	* You can access event parameter fron `this` inside your controller class
		* `eventParams` - property from event target

<br>

<h5>And finally you can see the examples inside `examples/` folder</h5>

<h3 align="center">. . .</h3>

### 📝 Some stuff

-  [Click here](https://stackoverflow.com/questions/29118825/attributes-nodename-of-elements-become-lowercase-automatically) for more detail about data attribute case sensitive (regarding event parameter)

<h3 align="center">. . .</h3>

### 🧰 Tech Stack

[<img alt="html" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" />](https://developer.mozilla.org/en-US/docs/Web/HTML) —
[<img alt="css" src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" />](https://developer.mozilla.org/en-US/docs/Web/CSS) —
[<img alt="javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />](https://developer.mozilla.org/en-US/docs/Web/javascript)

<h3 align="right">(⌐■_■)</h3>
