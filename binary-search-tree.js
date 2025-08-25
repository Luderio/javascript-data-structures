// Implementtaion of BST (Binary Search Tree)

/**
 * Binary Search Tree (BST) Characteristics:
 * 1. Binary Search Tree is a tree data structure that can only have a maximum of two (2) children nodes.
 * 2. Binary Search Trees are ORDERED.
 * 3. The left subtree contains only nodes with values less than the parent node's value.
 * 4. The right subtree contains only nodes with values greater than the parent node's value.
 * 5. Both the left and right subtrees must also be binary search trees.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a new value into the BST
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    function insertNode(node, value) {
      if (value < node.value) {
        if (node.left === null) {
          node.left = new Node(value);
          return;
        } else {
          return insertNode(node.left, value);
        }
      } else if (value > node.value) {
        if (node.right === null) {
          node.right = new Node(value);
          return;
        } else {
          return insertNode(node.right, value);
        }
      } else if (value === node.value) {
        console.warn(`The value you inserted: (${value}) already exists`);
        return `The value you inserted: (${value}) already exists`;
      }
    }
    return insertNode(this.root, value);
  }

  min() {
    if (this.root === null) {
      return null;
    }

    function findMinimum(node) {
      if (node.left !== null) {
        return findMinimum(node.left);
      } else {
        return node;
      }
    }

    return findMinimum(this.root);
  }

  max() {
    if (this.root === null) {
      return null;
    }

    function findMaximum(node) {
      if (node.right !== null) {
        return findMaximum(node.right);
      } else {
        return node;
      }
    }
    return findMaximum(this.root);
  }

  // Searches for the node in the tree that is equivalent to the value.
  search(value) {
    if (this.root === null) {
      console.warn("Tree has no nodes yet");
      return null;
    }

    function searchNode(node, value) {
      if (node === null) {
        return null;
      }

      if (value === node.value) {
        return node;
      }

      if (value < node.value) {
        return searchNode(node.left, value);
      }

      if (value > node.value) {
        return searchNode(node.right, value);
      }
    }

    return searchNode(this.root, value);
  }

  // Searches for the node in the tree that is equivalent to the value. Returns True if found, False if not.
  isPresent(value) {
    const node = this.search(value);
    return node !== null;
  }

  delete(value) {
    let node = this.search(value);
    if (node === null) {
      console.warn(
        `The node that you're trying to delete (Node: ${value}) does not exists in this tree.`
      );
      return null;
    }

    function deleteNode(node, value) {
      function findMinimum(node) {
        if (node.left !== null) {
          return findMinimum(node.left);
        } else {
          return node;
        }
      }

      if (value === node.value) {
        //  if the node does not have any children.
        if (node.left === null && node.right === null) {
          return null;
        }

        // if the selected node has no left children, replace the selected node with the right node.
        if (node.left === null) {
          return node.right;
        }

        // if the selected node has no right children, replace the selected node with the left node.
        if (node.right === null) {
          return node.left;
        }

        // if the node has children at both sides.
        if (node.left !== null && node.right !== null) {
          let successor = findMinimum(node.right);
          node.value = successor.value;
          node.right = deleteNode(node.right, successor.value);
        }
      } else if (value < node.value) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = deleteNode(node.right, value);
        return node;
      }

      return node;
    }

    return deleteNode(this.root, value);
  }
}

if (typeof module !== "undefined") {
  module.exports = BinarySearchTree;
}
