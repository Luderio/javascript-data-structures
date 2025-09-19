const Trie = require("../trie");

/**
 * Behaviors covered:
 * 1. Inserting and searching a word returns true, searching a non-existing word returns false
 * 2. Search is case-insensitive for inserted words
 * 3. startsWith returns true for existing prefixes and false for non-existing prefixes
 * 4. Searching a prefix that is not a complete word returns false
 * 5. print returns all inserted words (lowercased), without duplicates
 * 6. Deleting a leaf word removes it and does not affect unrelated words
 * 7. Deleting a word that is a prefix of other words unsets end-of-word but keeps children intact
 * 8. Deleting a non-existent word returns false and does not change existing words
 * 9. Deleting a single-character word returns true
 * 10. After multiple operations (insert/delete), startsWith and search remain consistent for remaining words
 */

describe("Trie", () => {
  test("1. Insert and search basic words; non-existing returns false", () => {
    const trie = new Trie();
    trie.insert("apple");
    trie.insert("banana");

    expect(trie.search("apple")).toBe(true);
    expect(trie.search("banana")).toBe(true);
    expect(trie.search("orange")).toBe(false);
  });

  test("2. Search is case-insensitive", () => {
    const trie = new Trie();
    trie.insert("MiXeDCaSe");

    expect(trie.search("mixedcase")).toBe(true);
    expect(trie.search("MIXEDCASE")).toBe(true);
    expect(trie.search("MixedCase")).toBe(true);
  });

  test("3. startsWith true for existing prefixes and false for non-existing", () => {
    const trie = new Trie();
    trie.insert("car");
    trie.insert("cart");
    trie.insert("carbon");

    expect(trie.startsWith("car")).toBe(true);
    expect(trie.startsWith("ca")).toBe(true);
    expect(trie.startsWith("carbon")).toBe(true);
    expect(trie.startsWith("cars")).toBe(false);
    expect(trie.startsWith("cab")).toBe(false);
  });

  test("4. Searching a prefix that is not a complete word returns false", () => {
    const trie = new Trie();
    trie.insert("testing");

    expect(trie.search("test")).toBe(false);
    expect(trie.startsWith("test")).toBe(true);
  });

  test("5. print returns all inserted words (lowercased), without duplicates", () => {
    const trie = new Trie();
    trie.insert("Dog");
    trie.insert("dog"); // duplicate different casing
    trie.insert("Door");
    trie.insert("doom");

    const words = trie.print();
    // array contains all three unique words in lowercase
    expect(words).toEqual(expect.arrayContaining(["dog", "door", "doom"]));
    expect(words.length).toBe(3);
  });

  test("6. Deleting a leaf word removes it and does not affect unrelated words", () => {
    const trie = new Trie();
    trie.insert("alpha");
    trie.insert("beta");

    expect(trie.search("beta")).toBe(true);
    const result = trie.delete("beta");
    expect(result).toBe(true);

    expect(trie.search("beta")).toBe(false);
    expect(trie.startsWith("bet")).toBe(false);

    // alpha remains intact
    expect(trie.search("alpha")).toBe(true);
    expect(trie.startsWith("alp")).toBe(true);
  });

  test("7. Deleting a word that is a prefix of other words unsets end-of-word but keeps children", () => {
    const trie = new Trie();
    trie.insert("app");
    trie.insert("apple");
    trie.insert("application");

    // Ensure initial state
    expect(trie.search("app")).toBe(true);
    expect(trie.search("apple")).toBe(true);
    expect(trie.search("application")).toBe(true);

    // Delete the prefix word only
    const result = trie.delete("app");
    expect(result).toBe(true);

    // "app" should no longer be a complete word
    expect(trie.search("app")).toBe(false);

    // Children words remain
    expect(trie.search("apple")).toBe(true);
    expect(trie.search("application")).toBe(true);

    // Prefix queries still true
    expect(trie.startsWith("app")).toBe(true);
  });

  test("8. Deleting a non-existent word returns false and keeps trie unchanged", () => {
    const trie = new Trie();
    trie.insert("gamma");
    trie.insert("gamut");

    const wordsBefore = trie.print().slice().sort();
    const result = trie.delete("gambit");
    expect(result).toBe(false);
    const wordsAfter = trie.print().slice().sort();

    expect(wordsAfter).toEqual(wordsBefore);
    expect(trie.search("gamma")).toBe(true);
    expect(trie.search("gamut")).toBe(true);
  });

  test("9. Deleting a single-character word returns true", () => {
    const trie = new Trie();
    trie.insert("a");

    expect(trie.delete("a")).toBe(true);

    expect(trie.search("a")).toBe(false);
  });

  test("10. Consistency after multiple operations", () => {
    const trie = new Trie();
    const words = ["cat", "cater", "catering", "dog", "dove", "do"];
    words.forEach((w) => trie.insert(w));

    // Delete a leaf and a non-leaf
    expect(trie.delete("dove")).toBe(true); // leaf
    expect(trie.delete("cater")).toBe(true); // non-leaf, prefix of catering

    // Remaining searches
    expect(trie.search("cat")).toBe(true);
    expect(trie.search("catering")).toBe(true); // should remain
    expect(trie.search("cater")).toBe(false); // deleted
    expect(trie.search("dove")).toBe(false); // deleted

    // startsWith checks
    expect(trie.startsWith("do")).toBe(true); // "dog" and "do" remain
    expect(trie.startsWith("dov")).toBe(false);

    // print should not include deleted words
    const printed = trie.print();
    expect(printed).toEqual(
      expect.arrayContaining(["cat", "catering", "dog", "do"])
    );
    expect(printed).not.toEqual(expect.arrayContaining(["dove", "cater"]));
  });
});
