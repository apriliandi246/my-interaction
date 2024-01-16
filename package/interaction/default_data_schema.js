/**
 * For default data schema
 * @param {string} controllerName
 * @returns {object}
 */
function getDefaultDataSchema(controllerName) {
	const dataSchema = {
		controller: "data-interaction-controller",
		target: `data-${controllerName}-target`,
		event: `data-${controllerName}-event`
	};

	return dataSchema;
}

export default getDefaultDataSchema;
