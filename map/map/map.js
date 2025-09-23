// Manual Implementation of Map Data Structure

class CustomMap {
  constructor() {
    this.collection = {};
    this.count = 0;
  }

  // will add and update the {key: value} pairs.
  set(key, value) {
    this.collection[key] = value;
    this.count++;
  }

  // will check if the key is existing in the map. returns the value if existing. null if not.
  get(key) {
    return key in this.collection ? this.collection[key] : null;
  }

  // will check for the existance of the key in the map. returns true of existing, false of not.
  has(key) {
    return key in this.collection;
  }

  delete(key) {
    if (this.has(key)) {
      delete this.collection[key];
      this.count--;
    }
  }

  clear() {
    if (this.count !== 0) {
      this.collection = {};
      this.count = 0;
    }
    return null;
  }

  size() {
    return this.count;
  }

  keys() {
    return Object.keys(this.collection);
  }

  values() {
    let values = new Array();
    for (let key of Object.keys(this.collection)) {
      values.push(this.collection[key]);
    }
    return values;
  }

  entries() {
    if (this.count === 0) return null;

    let items = new Array();
    let keys = this.keys();
    for (let key of keys) {
      items.push([this.collection[key], key]);
    }
    return items;
  }

  // my own implementation of forEach().
  forEach(callback) {
    const items = this.entries();

    if (!items) {
      console.warn("Map is empty.");
      return;
    }

    for (const [value, key] of items) {
      callback(value, key, this); // the third argument is not required.
    }
  }
}

if (typeof module !== "undefined") {
  module.exports = CustomMap;
}
