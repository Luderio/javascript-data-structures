const PriorityQueue = require("../priority-queue");

// Silence console errors during tests but allow assertions
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Behaviors covered:
 * 1. Higher priority items are dequeued first
 * 2. Timestamp tie-breaker preserves enqueue order among equal priorities
 * 3. Non-number priority is rejected with an error and item not added
 * 4. size() and isEmpty() reflect state changes accurately
 * 5. dequeue() returns formatted string and removes element
 * 6. front() returns first element when not empty
 * 7. front() returns null when called on an empty queue
 * 8. dequeue() throws when called on an empty queue
 * 9. print() returns internal state in sorted order (verify element ordering)
 */

describe("PriorityQueue", () => {
  test("1) higher priority items are dequeued first", () => {
    const q = new PriorityQueue();
    q.enqueue("low", 1);
    q.enqueue("high", 5);
    q.enqueue("mid", 3);

    expect(q.front()).toBe("high");
    expect(q.dequeue()).toBe("Dequeued: high");
    expect(q.front()).toBe("mid");
    expect(q.dequeue()).toBe("Dequeued: mid");
    expect(q.front()).toBe("low");
  });

  test("2) timestamp tie-breaker preserves enqueue order among equal priorities", () => {
    const q = new PriorityQueue();

    const seq = [1000, 1001, 1002];
    let i = 0;
    const spy = jest.spyOn(Date, "now").mockImplementation(() => seq[i++]);

    try {
      q.enqueue("A", 5);
      q.enqueue("B", 5);
      q.enqueue("C", 5);
    } finally {
      spy.mockRestore();
    }

    expect(q.dequeue()).toBe("Dequeued: A");
    expect(q.dequeue()).toBe("Dequeued: B");
    expect(q.dequeue()).toBe("Dequeued: C");
    expect(q.isEmpty()).toBe(true);
  });

  test("3) non-number priority is rejected and not added", () => {
    const q = new PriorityQueue();
    q.enqueue("bad", "x");
    expect(console.error).toHaveBeenCalledWith(
      "Error: Priority must be a number"
    );
    expect(q.size()).toBe(0);
    expect(q.isEmpty()).toBe(true);
  });

  test("4) size() and isEmpty() reflect state changes accurately", () => {
    const q = new PriorityQueue();
    expect(q.size()).toBe(0);
    expect(q.isEmpty()).toBe(true);

    q.enqueue("one", 1);
    q.enqueue("two", 2);
    expect(q.size()).toBe(2);
    expect(q.isEmpty()).toBe(false);

    q.dequeue();
    expect(q.size()).toBe(1);

    q.dequeue();
    expect(q.size()).toBe(0);
    expect(q.isEmpty()).toBe(true);
  });

  test("5) dequeue() returns formatted string and removes element", () => {
    const q = new PriorityQueue();
    q.enqueue("x", 2);
    expect(q.dequeue()).toBe("Dequeued: x");
    expect(q.size()).toBe(0);
  });

  test("6) front() returns first element when not empty", () => {
    const q = new PriorityQueue();
    q.enqueue("a", 1);
    q.enqueue("b", 3);
    q.enqueue("c", 2);
    expect(q.front()).toBe("b");
  });

  test("7) front() returns null when called on an empty queue", () => {
    const q = new PriorityQueue();
    expect(q.front()).toBeNull();
  });

  test("8) dequeue() logs an error when called on an empty queue", () => {
    const q = new PriorityQueue();
    q.dequeue();
    expect(console.error).toHaveBeenCalledWith("Error: Queue is empty");
  });

  test("9) print() returns internal state in sorted order by priority then timestamp", () => {
    const q = new PriorityQueue();

    const returns = [1000, 1002, 1001]; // control timestamps
    let i = 0;
    const spy = jest.spyOn(Date, "now").mockImplementation(() => returns[i++]);

    try {
      q.enqueue("A", 3); // ts 1000
      q.enqueue("B", 1); // ts 1002
      q.enqueue("C", 3); // ts 1001
    } finally {
      spy.mockRestore();
    }

    // Expect order: priority 3 first, tie-breaker by timestamp => A (1000), C (1001), then B (priority 1)
    const elementsInOrder = q.print().map((x) => x.element);
    expect(elementsInOrder).toEqual(["A", "C", "B"]);
  });
});
