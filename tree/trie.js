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

  // adds a new nodes for each of the characters of the input parameter
  this.insert = function (input) {
    input = input.toLowerCase();

    // this function is a recursive function that will create nodes for each of the characters of the input.
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
    input = input.toLowerCase();
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
    prefix = prefix.toLowerCase();
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
    word = word.toLowerCase();
    let selected_word = this.search(word);
    let intersection = [];
    let tracker = [];
    let previous_letter;
    let word_copy = word;
    let root_node = this.root;

    if (selected_word === false || selected_word === undefined) return false;
    if (word.length <= 0) return false;

    if (this.root.keys.has(word[0])) {
      function traverse(word, node) {
        if (word.length === 0) {
          if (node.isEnd()) {
            tracker.push({
              previous_letter: previous_letter,
              current_letter: word[0],
              node: node,
            });
            if (node.keys.size > 0) {
              node.setEnd(false);
              return true;
            } else if (node.keys.size === 0 && intersection.length === 0) {
              return root_node.keys.delete(word_copy[0]);
            } else if (
              tracker.length > 1 &&
              tracker[0].node.keys.get(tracker[0].current_letter).keys.size ===
                1
            ) {
              return tracker[0].node.keys.delete(tracker[0].current_letter);
            } else {
              return intersection[intersection.length - 1].node.keys.delete(
                intersection[intersection.length - 1].current_letter
              );
            }
          }
          return true;
        }

        if (node.keys.size > 1) {
          intersection.push({
            previous_letter: previous_letter,
            current_letter: word[0],
            node: node,
          });

          if (node.isEnd()) {
            tracker.push({
              previous_letter: previous_letter,
              current_letter: word[0],
              node: node,
            });
          }

          previous_letter = word[0];

          return traverse(word.substring(1), node.keys.get(word[0]));
        }

        if (node.keys.size === 1) {
          if (node.isEnd()) {
            tracker.push({
              previous_letter: previous_letter,
              current_letter: word[0],
              node: node,
            });
          }

          previous_letter = word[0];

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
