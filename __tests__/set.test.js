const CustomSet = require('../set');

// Silence console logs/errors during tests but keep ability to assert calls
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

beforeEach(() => {
  jest.clearAllMocks();
});

/**
 * Behaviors covered:
 * 1. has() reflects presence before and after add()
 * 2. add() prevents duplicates and size updates accordingly
 * 3. size() and values() return undefined when empty; numeric size/array when non-empty
 * 4. remove() deletes existing; removing non-existent logs an error and does not change size
 * 5. clear() empties the set and resets size()/values()
 * 6. union() merges unique values from two non-empty sets
 * 7. intersection() returns only common values
 * 8. difference() returns values in first set not in the second
 * 9. symmetricDifference() returns values in either set but not both
 * 10. isSubSet/isSuperSet compute correct relations
 * 11. Methods validate instance type and log on invalid inputs
 */

describe('CustomSet', () => {
  test('1) has() reflects presence before and after add()', () => {
    const s = new CustomSet();
    expect(s.has('A')).toBe(false);
    s.add('A');
    expect(s.has('A')).toBe(true);
  });

  test('2) add() prevents duplicates and size updates accordingly', () => {
    const s = new CustomSet();
    s.add('A');
    s.add('A');
    expect(s.size()).toBe(1);
    expect(s.values()).toEqual(['A']);
  });

  test('3) size() and values() undefined when empty; proper values when non-empty', () => {
    const s = new CustomSet();
    expect(s.size()).toBeUndefined();
    expect(s.values()).toBeUndefined();

    s.add(1);
    s.add(2);
    expect(s.size()).toBe(2);
    expect(s.values()).toEqual([1, 2]);
  });

  test('4) remove() deletes existing and logs error when removing non-existent', () => {
    const s = new CustomSet();
    s.add('A');
    s.add('B');

    s.remove('A');
    expect(s.has('A')).toBe(false);
    expect(s.size()).toBe(1);

    s.remove('X');
    expect(console.error).toHaveBeenCalledWith('Error: Item not found in the set');
    expect(s.size()).toBe(1);
    expect(s.values()).toEqual(['B']);
  });

  test('5) clear() empties the set and resets size()/values()', () => {
    const s = new CustomSet();
    s.add(1);
    s.add(2);
    s.clear();
    expect(s.size()).toBeUndefined();
    expect(s.values()).toBeUndefined();
  });

  test('6) union() merges unique values from two non-empty sets', () => {
    const a = new CustomSet();
    const b = new CustomSet();
    a.add(1); a.add(2);
    b.add(2); b.add(3);

    const u = a.union(b);
    expect(u).toBeInstanceOf(CustomSet);
    expect(u.values()).toEqual([1, 2, 3]);
  });

  test('7) intersection() returns only common values', () => {
    const a = new CustomSet();
    const b = new CustomSet();
    a.add(1); a.add(2); a.add(3);
    b.add(2); b.add(4);

    const i = a.intersection(b);
    expect(i).toBeInstanceOf(CustomSet);
    expect(i.values()).toEqual([2]);
  });

  test('8) difference() returns values in first set not in the second', () => {
    const a = new CustomSet();
    const b = new CustomSet();
    a.add(1); a.add(2); a.add(3);
    b.add(2); b.add(4);

    const d = a.difference(b);
    expect(d).toBeInstanceOf(CustomSet);
    expect(d.values()).toEqual([1, 3]);
  });

  test('9) symmetricDifference() returns values present in either set but not both', () => {
    const a = new CustomSet();
    const b = new CustomSet();
    a.add(1); a.add(2);
    b.add(2); b.add(3);

    const s = a.symmetricDifference(b);
    expect(s).toBeInstanceOf(CustomSet);
    expect(s.values()).toEqual([1, 3]);
  });

  test('10) isSubSet/isSuperSet compute correct relations', () => {
    const a = new CustomSet();
    const b = new CustomSet();
    a.add(1); a.add(2);
    b.add(1); b.add(2); b.add(3);

    expect(a.isSubSet(b)).toBe(true);
    expect(b.isSuperSet(a)).toBe(true);

    const c = new CustomSet();
    c.add(4);
    expect(a.isSubSet(c)).toBe(false);
    expect(c.isSuperSet(a)).toBe(false);
  });

  test('11) methods validate instance type and log error message', () => {
    const a = new CustomSet();

    const u = a.union({});
    const i = a.intersection({});
    const d = a.difference({});
    const s = a.symmetricDifference({});

    expect(console.log).toHaveBeenCalledWith('Argument must be an instance of CustomSet');
    expect(u).toBeUndefined();
    expect(i).toBeUndefined();
    expect(d).toBeUndefined();
    expect(s).toBeUndefined();
  });
});
