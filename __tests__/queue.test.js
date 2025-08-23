const Queue = require('../queue');

// Silence console logs during tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

/**
 * Behaviors covered:
 * 1. New queue is empty via isEmpty() and size()
 * 2. Enqueue updates size and front correctly
 * 3. Dequeue returns elements in FIFO order
 * 4. front() returns undefined on empty queue
 * 5. Size is accurate across multiple operations
 * 6. Supports non-primitive values (objects/arrays) by reference
 * 7. dequeue() on empty returns undefined and size remains 0
 * 8. print() returns current array snapshot
 */

describe('Queue', () => {
  test('1) new queue should be empty (isEmpty + size)', () => {
    const q = new Queue();
    expect(q.isEmpty()).toBe(true);
    expect(q.size()).toBe(0);
  });

  test('2) enqueue should update size and front correctly', () => {
    const q = new Queue();
    q.enqueue('A');
    expect(q.size()).toBe(1);
    expect(q.front()).toBe('A');

    q.enqueue('B');
    expect(q.size()).toBe(2);
    expect(q.front()).toBe('A'); // front stays the same after enqueue at back
  });

  test('3) dequeue should return elements in FIFO order', () => {
    const q = new Queue();
    q.enqueue('A');
    q.enqueue('B');
    q.enqueue('C');

    expect(q.dequeue()).toBe('A');
    expect(q.dequeue()).toBe('B');
    expect(q.dequeue()).toBe('C');
    expect(q.isEmpty()).toBe(true);
  });

  test('4) front() should be undefined on empty queue', () => {
    const q = new Queue();
    expect(q.front()).toBeUndefined();
  });

  test('5) size should be accurate across operations', () => {
    const q = new Queue();
    expect(q.size()).toBe(0);
    q.enqueue(1);
    q.enqueue(2);
    expect(q.size()).toBe(2);
    q.dequeue();
    expect(q.size()).toBe(1);
    q.dequeue();
    expect(q.size()).toBe(0);
  });

  test('6) works with non-primitive values by reference', () => {
    const q = new Queue();
    const obj = { x: 1 };
    const arr = [1, 2, 3];

    q.enqueue(obj);
    q.enqueue(arr);

    expect(q.front()).toBe(obj);
    expect(q.dequeue()).toBe(obj);
    expect(q.front()).toBe(arr);
  });

  test('7) dequeue on empty returns undefined and size stays 0', () => {
    const q = new Queue();
    expect(q.dequeue()).toBeUndefined();
    expect(q.size()).toBe(0);
    expect(q.isEmpty()).toBe(true);
  });

  test('8) print returns current state array snapshot', () => {
    const q = new Queue();
    q.enqueue('A');
    q.enqueue('B');

    const state = q.print();
    expect(Array.isArray(state)).toBe(true);
    expect(state).toEqual(['A', 'B']);

    // Ensure snapshot is not the same array reference returned across calls (not required by spec),
    // but current implementation returns the same underlying array reference. We assert content only.
    q.dequeue();
    const state2 = q.print();
    expect(state2).toEqual(['B']);
  });
});
