function HashTable() {
  this.size = 0;
  this.storage_size = 100;
  let table = new Array(this.size);

  this._hash = function (key) {
    let hash = 0;
    key.split("").forEach((char) => {
      hash += char.charCodeAt(0);
    });

    // console.log(hash % this.size);
    return hash % this.storage_size;
  };

  this.set = function (key, value) {
    let index = this._hash(key);

    if (table[index] === undefined) {
      table[index] = [[key, value]];
      this.size++;
    }

    // checks if the index, has more than one [key, value] pairs
    if (table[index].length >= 1) {
      // if length > 1, loop through the items.
      table[index].forEach((item) => {
        if (item[0] === key) {
          item[1] = value;
        } else {
          table[index].push([key, value]);
          this.size++;
        }
      });
    }
  };

  this.get = function (key) {
    let index = this._hash(key);

    if (table[index] === undefined) return undefined;

    if (table[index].length > 1) {
      let result = table[index].filter((item) => {
        return item[0] === key;
      });
      return result[0][1];
    }

    if (table[index].length === 1) {
      return table[index][0][1];
    }
  };

  this.has = function (key) {
    let item = this.get(key);
    return item === undefined ? false : true;
  };

  this.delete = function (key) {
    let item = this.has(key);

    if (item) {
      let index = this._hash(key);
      if (table[index].length > 1) {
        table[index].forEach((item, index) => {
          if (item[0] === key) {
            table[index].splice(index, 1);
            this.size--;
          }
        });
      }

      if (table[index][0][0] === key) {
        table[index].splice(0, 1);
        this.size--;
      }
    }
  };

  this.keys = function () {
    let keys = [];

    if (table.length === undefined) return undefined;
    if (table.length === 0) return [];

    table.forEach((item) => {
      if (item.length !== undefined || item.length !== 0) {
        if (item.length === 1) {
          keys.push(item[0][0]);
        } else {
          item.forEach((item) => {
            keys.push(item[0]);
          });
        }
      }
    });

    return keys;
  };

  this.values = function () {
    let values = [];

    if (table.length === undefined) return undefined;
    if (table.length === 0) return [];

    table.forEach((item) => {
      if (item.length !== undefined || item.length !== 0) {
        if (item.length === 1) {
          values.push(item[0][1]);
        } else {
          item.forEach((item) => {
            values.push(item[1]);
          });
        }
      }
    });

    return values;
  };

  this.entries = function () {
    let entries = [];

    if (table.length === undefined) return undefined;
    if (table.length === 0) return [];

    table.forEach((item) => {
      if (item.length !== undefined || item.length !== 0) {
        if (item.length === 1) {
          entries.push([item[0][0], item[0][1]]);
        } else {
          item.forEach((item) => {
            entries.push([item[0], item[1]]);
          });
        }
      }
    });

    return entries;
  };

  this.clear = function () {
    table = new Array(this.size);
    this.size = 0;
  };
}

if (typeof module !== "undefined") {
  module.exports = HashTable;
}
