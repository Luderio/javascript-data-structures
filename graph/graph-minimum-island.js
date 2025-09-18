/**
 * Graph: Minimum Island
 * Write a function minimumIsland(), that takes in a grid containing Ws and Ls.
 * W represents water and L represents land.
 * The function should return the size of the smallest island.
 * An island is a vertically or horizontally connected region if land.
 * You may assume that grid contains at least one island.
 */

const islandCount = (grid) => {
  const visited = new Set();
  let land = [];
  let size = [];
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      if (sail(grid, row, column, land, visited) === true) {
        let island_size = land.length;
        size.push(island_size);
        land = [];
      }
    }
  }

  return Math.min(...size);
};

const sail = (grid, row, column, land, visited) => {
  const validRowCoordinate = 0 <= row && row < grid.length;
  const validColumnCoordinate = 0 <= column && column < grid[0].length;

  if (!validRowCoordinate || !validColumnCoordinate) return false;
  if (!Array.isArray(grid) || !visited.constructor === Set) return false;
  if (grid[row][column] === "W" || grid[row][column] === "w") return false;

  const coordinates = `${row},${column}`;

  if (grid[row][column] === "L" && !visited.has(coordinates))
    land.push(grid[row][column]);

  if (visited.has(coordinates)) return false;
  visited.add(coordinates);

  // this recursive calls will only be called on L nodes that is not yet added to the visited set.
  sail(grid, row - 1, column, land, visited);
  sail(grid, row + 1, column, land, visited);
  sail(grid, row, column - 1, land, visited);
  sail(grid, row, column + 1, land, visited);

  return true;
};

const grid = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "w", "w"],
  ["W", "w", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

console.log(islandCount(grid));
