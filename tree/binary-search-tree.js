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
    this.previousNode = [];
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

  // will traverse the nodes and find the smallest value.
  min() {
    if (this.root === null) return null;

    // will travel to the left most part of the tree.
    function findMinimum(node) {
      if (node.left !== null) {
        return findMinimum(node.left);
      } else {
        return node;
      }
    }

    return findMinimum(this.root);
  }

  // will traverse the nodes and finds the largest value.
  max() {
    if (this.root === null) {
      return null;
    }

    // will travel to the rightmost part of the tree.
    function findMaximum(node) {
      if (node.right !== null) {
        return findMaximum(node.right);
      } else {
        return node;
      }
    }
    return findMaximum(this.root);
  }

  // will check if the tree nodes are balanced.
  isBalanced() {
    return this.minHeight() >= this.maxHeight() - 1;
  }

  // will traverse the nodes at the left and right side and will stop at the first leaf node (a parent without 2 children).
  //  the side with the shortest level of nodes determine the hight of the tree.
  minHeight(node = this.root) {
    if (node === null) return -1;

    let left = this.minHeight(node.left);
    let right = this.minHeight(node.right);

    // If one child is missing, use the height of the existing child
    if (left === -1) return right + 1;
    if (right === -1) return left + 1;

    // // If one child is missing, use the height of the existing child. This code is good but it affects the isBalanced Method.
    // if (left === -1) return right + 1;
    // if (right === -1) return left + 1;

    return Math.min(left, right) + 1;
  }

  maxHeight(node = this.root) {
    if (node === null) return -1;

    let left = this.maxHeight(node.left);
    let right = this.maxHeight(node.right);

    return Math.max(left, right) + 1;
  }

  // Searches for the node in the tree that is equivalent to the value.
  search(value) {
    if (this.root === null) {
      console.warn("Tree has no nodes yet");
      return null;
    }

    function searchNode(node, value) {
      if (node === null) return null;
      if (value === node.value) return node;
      if (value < node.value) return searchNode(node.left, value);
      if (value > node.value) return searchNode(node.right, value);
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

        // if the selected node has no left children
        if (node.left === null) {
          return node.right;
        }

        // if the selected node has no right children
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

  // begins the exploration of the tree values from the leftmost node and end on the rightmost node.
  inOrder() {
    if (this.root === null) {
      return null;
    }

    let result = [];
    function traverse(node) {
      node.left && traverse(node.left);
      result.push(node.value);
      node.right && traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  // begins the exploration of the tree from the root node to the leaf nodes (nodes without children)
  preOrder() {
    if (this.root === null) {
      return null;
    }

    let result = [];
    function traverse(node) {
      result.push(node.value);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }

    traverse(this.root);
    return result;
  }

  // begins the exploration of the tree from the leaf node (nodes without children) to the root node.
  postOrder() {
    if (this.root === null) {
      return null;
    }

    let result = [];
    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      result.push(node.value);
    }

    traverse(this.root);
    return result;
  }

  // explores all the nodes in a given level within a tree before continuing on to the next level.
  levelOrder() {
    let result = [];
    let Q = [];

    if (this.root === null) return null;

    Q.push(this.root);
    while (Q.length > 0) {
      let node = Q.shift();
      result.push(node.value);

      if (node.left !== null) {
        Q.push(node.left);
      }

      if (node.right !== null) {
        Q.push(node.right);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined") {
  module.exports = BinarySearchTree;
}
