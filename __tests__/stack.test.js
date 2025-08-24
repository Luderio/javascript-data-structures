const Stack = require("../stack");

// const test = require("node:test");

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

/**
 * Behaviors covered:
 * 1. New stack is empty via isEmpty(), 0 via size(), and undefined via peek() when created
 * 2. Pushing items increases size and changes isEmpty() result
 * 3. Popping items decreases size and changes isEmpty() result
 * 4. Popping items when the stack is empty returns undefined
 * 5. Peeking at the stack shows the top item without removing it
 * 6. Peeking a the stack when stack is empty returns undefined
 * 7. Clearing the stack empties it
 * 8. Stack supports non-primitive values (objects/arrays) by reference
 * 9. Size is accurate across multiple operations
 * 10. Checking size() after clearing returns 0
 * 11. Checking isEmpty() when the stack has contents returns false
 * 12. Checking isEmpty() when the stack is empty returns true
 */

describe("Stack", () => {
  test("1. New stack is true via isEmpty(), 0 via size(), and undefined via peek() when created", () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
    expect(stack.peek()).toBe(undefined);
  });
});
