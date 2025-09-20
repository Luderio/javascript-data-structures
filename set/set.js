// Manual Set implementation

// Set Characteristics
// 1. Unique values: A set only stores unique values, meaning duplicates are not allowed.
// 2. Unordered: The elements in a set are not stored in any particular order.
// 3. Iterable: Sets are iterable, allowing you to loop through their elements.
// 4. Dynamic size: Sets can grow and shrink in size as elements are added or removed.

function CustomSet() {
  let collection = [];

  // check if set is an intance of CustomSet.
  function validateInstance(set) {
    if (set instanceof CustomSet === false) {
      throw new Error("Argument must be an instance of CustomSet");
    }
  }

  // will check for the presence of the element item. Will return true if the element is found and false otherwise.
  this.has = function (item) {
    return collection.indexOf(item) !== -1;
  };

  // checks first if the set already has the element items being added. Will ignore the item if found.
  this.add = function (element) {
    if (!this.has(element)) {
      collection.push(element);
    }
  };

  // checks if the element item being removed is present in the set. Removes the element item if found. Ignores the removal of item if not found.
  this.remove = function (item) {
    if (this.has(item)) {
      let index = collection.indexOf(item);
      collection.splice(index, 1);
    } else {
      console.error("Error: Item not found in the set");
      return;
    }
  };

  // returns all the values in the set
  this.size = function () {
    return collection.length;
  };

  // will display all the contents of the set.
  this.values = function () {
    if (collection.length === 0) {
      return undefined;
    } else {
      return collection;
    }
  };

  // will create all the content of the set to be empty.
  this.clear = function () {
    collection = [];
  };

  // combines elements from both sets. Will only accept sets that is an intance of CustomSet.
  this.union = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let unionSet = new CustomSet();
      let existingSet = this.values();
      let newSet = otherSet.values();

      existingSet.forEach((value) => {
        unionSet.add(value);
      });

      newSet.forEach((value) => {
        unionSet.add(value);
      });
      return unionSet;
    } catch (error) {
      console.log(error.message);
    }
  };

  // returns a new set with elements present in both sets.
  this.intersection = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let intersection = new CustomSet();
      let existingSet = this.values();
      existingSet.forEach((value) => {
        if (otherSet.has(value)) {
          intersection.add(value);
        }
      });
      return intersection;
    } catch (error) {
      console.log(error.message);
    }
  };

  // will return elements in the first set that is not in the second.
  this.difference = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let difference = new CustomSet();
      let existingSet = this.values();

      existingSet.forEach((value) => {
        if (!otherSet.has(value)) {
          difference.add(value);
        }
      });

      return difference;
    } catch (error) {
      console.log(error.message);
    }
  };

  // will return elements in each set that is not found in both set.
  this.symmetricDifference = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let symmetricDifference = new CustomSet();
      let existingSet = this.values();
      let newSet = otherSet.values();

      existingSet.forEach((value) => {
        if (!otherSet.has(value)) {
          symmetricDifference.add(value);
        }
      });

      newSet.forEach((value) => {
        if (!this.has(value)) {
          symmetricDifference.add(value);
        }
      });

      return symmetricDifference;
    } catch (error) {
      console.log(error.message);
    }
  };

  // will check if one set is a subset of another. (if every items in the first set is found in the second set).
  this.isSubSet = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let existingSet = this.values();
      let newSet = otherSet.values();
      return existingSet.every((value) => newSet.includes(value));
    } catch (error) {
      console.log(error.message);
    }
  };

  // will check if one set is a superset of another (if every items in the second set is found in the first set).
  this.isSuperSet = function (otherSet) {
    try {
      // check if set is an intance of CustomSet.
      validateInstance(otherSet);

      let existingSet = this.values();
      let newSet = otherSet.values();
      return newSet.every((value) => existingSet.includes(value));
    } catch (error) {
      console.log(error.message);
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = CustomSet;
}

let set = new CustomSet();
console.log(set.size());
