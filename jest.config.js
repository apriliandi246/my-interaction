const config = {
	cache: false,
	verbose: true,
	collectCoverage: true,
	testEnvironment: "jsdom",
	testPathIgnorePatterns: ["/node_modules/", "/some-shit"],
	coveragePathIgnorePatterns: ["/some-shit"]
};

export default config;
