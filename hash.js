function HashTable() {
  this.size = 100;
  this.table = new Array(this.size);

  this._hash = function (key) {
    let hash = 0;
    key.split("").forEach((char) => {
      hash += char.charCodeAt(0);
    });

    // console.log(hash % this.size);
    return hash % this.size;
  };

  this.set = function (key, value) {
    let index = this._hash(key);

    if (this.table[index] === undefined) this.table[index] = [[key, value]];

    // checks if the index, has more than one [key, value] pairs
    if (this.table[index].length >= 1) {
      // if length > 1, loop through the items.
      this.table[index].forEach((item) => {
        if (item[0] === key) {
          item[1] = value;
        }
      });
    }
  };

  this.get = function (key) {
    let index = this._hash(key);

    if (this.table[index] === undefined) return undefined;

    if (this.table[index].length > 1) {
      let result = this.table[index].filter((item) => {
        return (item[0] = key);
      });
      return result;
    }

    if (this.table[index].length === 1) {
      return this.table[index][0][1];
    }
  };

  this.has = function (key) {
    let item = this.get(key);
    return item ? true : false;
  };

  this.delete = function (key) {
    let item = this.has(key);

    if (item) {
      let index = this._hash(key);
      if (this.table[index].length > 1) {
        this.table[index].forEach((item, index) => {
          if (item[0] === key) {
            this.table[index].splice(index, 1);
          }
        });
      }

      if (this.table[index][0][0] === key) {
        this.table[index].splice(0, 1);
      }
    }
  };
}

let table = new HashTable();
table.set("firstname", "Luderio");
table.set("lastname", "Sanchez");
table.set("firstname", "Chezzy");
console.log(table.has("last_name"));
console.log(table.get("firstname"));
console.log(table.size);

console.log(table.table);

table.delete("lastname");
