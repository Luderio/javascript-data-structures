// Trie Data Structure Implementtaion

function Trie() {
  function Node() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function (status = true) {
      this.end = status;
    };
    this.isEnd = function () {
      return this.end;
    };
  }

  this.root = new Node();

  this.insert = function (input) {
    function createNodes(input, node = this.root) {
      if (input.length === 0) {
        node.setEnd(true);
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
    function searchWord(input, node) {
      if (input.length === 1 && node.keys.has(input)) {
        return node.keys.get(input).isEnd() ? true : false;
      }

      if (node.keys.has(input[0]) === false) {
        return false;
      } else {
        return searchWord(input.substring(1), node.keys.get(input[0]));
      }
    }
    return searchWord(input, this.root);
  };

  this.startsWith = function (prefix) {
    let node = this.root;

    while (prefix.length > 1) {
      let letter = prefix[0];
      if (node.keys.get(letter) === undefined) {
        return false;
      } else {
        node = node.keys.get(letter);
        prefix = prefix.substring(1);
      }
    }

    // return node.keys.get(prefix) ? true : false;
    if (node.keys.get(prefix)) {
      return true;
    } else {
      return false;
    }
  };

  this.print = function () {
    let words = new Array();
    let traverse = function (node, string) {
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {
          traverse(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    };
    traverse(this.root, new String());
    return words.length > 0 ? words : undefined;
  };

  this.delete = function (word) {
    let selected_word = this.search(word);
    let intersection = [];
    let root_node = this.root;
    let word_copy = word;

    if (selected_word === false || selected_word === undefined) return false;
    if (word.length === 1) return false;

    if (this.root.keys.has(word[0])) {
      function traverse(word, node) {
        if (word.length === 0) {
          if (node.isEnd() && intersection.length < 2) {
            console.log("Word Ends with no intersection:", intersection);
            return; // return root_node.keys.delete(intersection[0]);
          }

          console.log("Word Ends with intersection:", intersection);
          intersection.forEach((item) => {
            root_node.keys.get()
          });
        }

        if (node.keys.size > 1) {
          if (node.isEnd() && node.keys.size > 1) {
            node.setEnd(false);
            return traverse(word.substring(1), node.keys.get(word[0]));
          } else {
            intersection.push(word[0]);
            return traverse(word.substring(1), node.keys.get(word[0]));
          }
        }

        if (node.keys.size === 1) {
          if (node.isEnd()) {
            console.log("Word Ends with no intersection word:", word[0]);
          }
          return traverse(word.substring(1), node.keys.get(word[0]));
        }
      }

      return traverse(word, this.root);
    }
  };
}

if (typeof module !== "undefined") {
  module.exports = Trie;
}
