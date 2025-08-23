const Stack = require("../stack");

beforeAll(() => {
  JestHasteMap.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

/**
 * Behaviors covered:
 */
