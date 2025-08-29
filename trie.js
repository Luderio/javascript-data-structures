// Trie Data Structure Implementtaion

function Trie() {
  function Node() {
    this.keys = new Map();
    this.end - false;
    this.setEnd = function () {
      this.end = true;
    };
    this.isEnd = function () {
      return this.end;
    };
  }

  this.root = new Node();

  this.insert = function (input) {
    function createNodes(input, node = this.root) {
      if (input.length === 0) {
        node.setEnd();
        return;
      }
      if (node.keys.has(input[0]) === false) {
        let new_node = new Node();
        node.keys.set(input[0], new_node);
        return createNodes(input.substring(1), node.keys.get(input[0]));
      } else {
        return createNodes(input.substring(1), node.keys.get(input[0]));
      }
    }
    createNodes(input, this.root);
  };

  this.search = function (input) {
    let node = this.root;

    while (input.length > 1) {
      if (node.keys.has(input[0]) === false) {
        return false;
      } else {
        node = node.keys.get(input[0]);
        input = input.substring(1);
      }
    }
    return node.keys.has(input) && node.keys.get(input).isEnd() ? true : false;
  };

  this.print = function () {
    let words = new Array();
    let search = function (node, string) {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    search(this.root, new String());
    return words.length > 0 ? words : mo;
  };
}

if (typeof module !== "undefined") {
  module.exports = Trie;
}
