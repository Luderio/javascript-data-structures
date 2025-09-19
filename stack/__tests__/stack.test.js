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
 * 2. Pushing items increases size(), changes isEmpty() result to false, and displays the correct top element when peek() is used
 * 3. Popping items decreases size when size() is used and changes peek() result to display the correct top element in the stack
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

  test("2. Pushing items increases size(), changes isEmpty() result to false, and displays the correct top element when peek() is used", () => {
    const stack = new Stack();
    expect(stack.size()).toBe(0);
    stack.push("Item 1");
    expect(stack.size()).toBe(1);
    stack.push("Item 2");
    expect(stack.size()).toBe(2);

    expect(stack.isEmpty()).toBe(false);

    expect(stack.peek()).toBe("Item 2");
  });

  test("3. Popping items decreases size when size() is used and changes peek() result to display the correct top element in the stack", () => {
    const stack = new Stack();
    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    stack.push("Item 4");

    expect(stack.size()).toBe(4);
    expect(stack.peek()).toBe("Item 4");
    stack.pop();
    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe("Item 3");
  });

  test("4. Popping items when the stack is empty returns undefined", () => {
    const stack = new Stack();
    expect(stack.pop()).toBe(undefined);

    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    stack.push("Item 4");

    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();
    expect(stack.pop()).toBe(undefined);
  });

  test("5. Peeking at the stack shows the top item without removing it", () => {
    const stack = new Stack();
    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    stack.push("Item 4");

    expect(stack.peek()).toBe("Item 4");
  });

  test("6. Peeking a the stack when stack is empty returns undefined", () => {
    const stack = new Stack();
    expect(stack.peek()).toBe(undefined);

    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    stack.push("Item 4");

    stack.pop();
    stack.pop();
    stack.pop();
    stack.pop();

    expect(stack.peek()).toBe(undefined);
  });

  test("7. Clearing the stack empties it", () => {
    const stack = new Stack();
    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    expect(stack.size()).toBe(3);
    stack.clear();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
    expect(stack.peek()).toBe(undefined);
  });

  test("8. Stack supports non-primitive values (objects/arrays) by reference", () => {
    const stack = new Stack();
    const obj = { id: 1, name: "Item 1" };
    const arr = [1, 2, 3];

    stack.push(obj);
    stack.push(arr);

    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(arr);

    stack.pop();
    expect(stack.peek()).toBe(obj);
  });

  test("9. Size is accurate across multiple operations", () => {
    const stack = new Stack();
    expect(stack.size()).toBe(0);

    stack.push("Item 1");
    expect(stack.size()).toBe(1);

    stack.push("Item 2");
    expect(stack.size()).toBe(2);

    stack.pop();
    expect(stack.size()).toBe(1);

    stack.clear();
    expect(stack.size()).toBe(0);
  });

  test("10. Checking size() after clearing returns 0", () => {
    const stack = new Stack();
    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    stack.clear();
    expect(stack.size()).toBe(0);
  });

  test("11. Checking isEmpty() when the stack has contents returns false", () => {
    const stack = new Stack();
    stack.push("Item 1");
    stack.push("Item 2");
    stack.push("Item 3");
    expect(stack.isEmpty()).toBe(false);
  });

  test("12. Checking isEmpty() when the stack is empty returns true", () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
  });
});
