/**
 * Graph: Minimum Island
 * Write a function minimumIsland(), that takes in a grid containing Ws and Ls.
 * W represents water and L represents land.
 * The function should return the size of the smallest island.
 * An island is a vertically or horizontally connected region if land.
 * You may assume that grid contains at least one island.
 */

const minimumIsland = (grid) => {
  const visited = new Set();
  let minumun_size = Infinity;
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      const size = sail(grid, row, column, visited);
      if (size > 0 && size < minumun_size) {
        minumun_size = size;
      }
    }
  }

  return minumun_size;
};

const sail = (grid, row, column, visited) => {
  const validRowCoordinate = 0 <= row && row < grid.length;
  const validColumnCoordinate = 0 <= column && column < grid[0].length;

  if (!validRowCoordinate || !validColumnCoordinate) return 0;
  if (!Array.isArray(grid) || !visited.constructor === Set) return 0;
  if (grid[row][column] === "W" || grid[row][column] === "w") return 0;

  const coordinates = `${row},${column}`;

  if (visited.has(coordinates)) return 0;
  visited.add(coordinates);

  let size = 1;

  // this recursive calls will only be called on L nodes that is not yet added to the visited set.
  size += sail(grid, row - 1, column, visited);
  size += sail(grid, row + 1, column, visited);
  size += sail(grid, row, column - 1, visited);
  size += sail(grid, row, column + 1, visited);

  return size;
};

const grid = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "w", "w"],
  ["W", "w", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

console.log(minimumIsland(grid));
