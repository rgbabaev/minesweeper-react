import times from '../lib/times.mjs';

/*
     mines  opened
     near   | mined
    |.....| | | flagged
  0 0 0 0 0 0 0 0
*/

// const toIntCell = ({
//   flagged = false,
//   mined = false,
//   opened = false,
//   neighborMines = 0
// }) => {
//   if (neighborMines < 0 || neighborMines > 8)
//     throw new Error('neighborMines is out of range');

//   return (neighborMines << 3) + (+opened << 2) + (+mined << 1) + +flagged;
// }

export const CELL_FLAGGED = 1;
export const CELL_MINED = 2;
export const CELL_OPENED = 4;

export const isCellMined = (cell = 0) => !!(cell & CELL_MINED);
export const isCellOpened = (cell = 0) => !!(cell & CELL_OPENED);
export const isCellFlagged = (cell = 0) => !!(cell & CELL_FLAGGED);
export const getCellNeighborMines = (cell = 0) => cell >> 3;
// export const openCell = (cell = 0) => cell | CELL_OPENED;
// export const flagCell = (cell = 0) => cell | CELL_FLAGGED;
// export const unflagCell = (cell = 0) => cell & (~CELL_FLAGGED);
export const toggleCellFlag = (cell = 0) => cell ^ CELL_FLAGGED;

export function getFreeRandomCell([width, height], flatBusyCells) {
  const sortedBusyCells = flatBusyCells
    .slice(0)
    .sort((a, b) => (a > b ? 1 : -1));
  const freeCellsCount = width * height - sortedBusyCells.length;
  const flatTargetInFreeSpace = Math.floor(Math.random() * freeCellsCount);

  const blockedCellsLeft = sortedBusyCells.reduce((acc, position, index) => {
    const freeCellsLeft = position - index;
    return freeCellsLeft <= flatTargetInFreeSpace ? index + 1 : acc;
  }, 0);

  return blockedCellsLeft + flatTargetInFreeSpace;
}

export function getFreeRandomCellXY(arena, busyCells) {
  const arenaWidth = arena[0];
  const flatBusyCells = busyCells.map(([x, y]) => y * arenaWidth + x);
  const flatTarget = getFreeRandomCell(arena, flatBusyCells);
  return [flatTarget % arenaWidth, Math.floor(flatTarget / arenaWidth)];
}

export const getMines = (arena, minesCount, safeCell) => {
  const mines = [safeCell];
  times(() => mines.push(getFreeRandomCell(arena, mines)), minesCount);
  return mines.slice(1).sort((a, b) => (a > b ? 1 : -1));
};

const enlargeMapValue = (map, cell) => (map[cell] = (map[cell] || 0) + 1);

export const getNeighborCells = ([width, height], i) => {
  const cells = [];

  const col = i % width;
  const row = Math.floor(i / width);

  if (row > 0) {
    if (col > 0) cells.push(i - width - 1);
    cells.push(i - width);
    if (col < width - 1) cells.push(i - width + 1);
  }
  if (col > 0) cells.push(i - 1);
  if (col < width - 1) cells.push(i + 1);
  if (row < height - 1) {
    if (col > 0) cells.push(i + width - 1);
    cells.push(i + width);
    if (col < width - 1) cells.push(i + width + 1);
  }

  return cells;
};

export const calcHeatMap = ([width, height], mines = []) => {
  const map = [];

  mines.forEach((cell) => {
    const col = cell % width;
    const row = Math.floor(cell / width);

    if (row > 0) {
      if (col > 0) enlargeMapValue(map, cell - width - 1);
      enlargeMapValue(map, cell - width);
      if (col < width - 1) enlargeMapValue(map, cell - width + 1);
    }
    if (col > 0) enlargeMapValue(map, cell - 1);
    if (col < width - 1) enlargeMapValue(map, cell + 1);
    if (row < height - 1) {
      if (col > 0) enlargeMapValue(map, cell + width - 1);
      enlargeMapValue(map, cell + width);
      if (col < width - 1) enlargeMapValue(map, cell + width + 1);
    }
  });

  return map;
};

export function genCells(arena, minesCount, clicked) {
  const mines = getMines(arena, minesCount, clicked);
  const heatMap = calcHeatMap(arena, mines);

  const cells = times(
    (i) => (heatMap[i] << 3) + (+mines.includes(i) << 1),
    arena[0] * arena[1]
  );

  return [cells, mines];
}

export function arraysCompare(a, b) {
  if (a.length !== b.length) return false;

  return !a.some((item, i) => b[i] !== item);
}
