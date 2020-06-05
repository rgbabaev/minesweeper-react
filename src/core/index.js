import {
  arraysCompare,
  genCells,
  getNeighborCells,
  CELL_FLAGGED,
  CELL_MINED,
  CELL_OPENED,
  getCellNeighborMines,
  toggleCellFlag
} from './helpers';

export class Minesweeper {
  constructor(arena, minesCount, redrawFn) {
    this.redrawFn = redrawFn;
    this.arena = arena || [9, 9];
    this.minesCountTotal = minesCount || 10;
    this.reset();
  }

  configure(arena, minesCount) {
    this.arena = arena;
    this.minesCountTotal = minesCount;
    this.reset();
  }

  startTimer = () => {
    this.startTime = Date.now();
    this.timerId = setInterval(this._render.bind(this), 1000);
  };

  stopTimer = () => {
    this.endTime = Date.now();
    clearInterval(this.timerId);
  };

  handleCellClick = i => {
    if (this.gameState !== 'playing') return;

    const cell = this.cells[i];

    if (this.flaggingMode && !(cell & CELL_OPENED)) {
      this.flagCell(i);
      return;
    }

    if (cell & CELL_FLAGGED) return;

    if (cell & CELL_OPENED) this._openNeighborCells(i);
    else this._openCell(i);
    this._render();
  };

  toggleFlaggingMode = () => {
    if (this.gameState === 'playing') {
      this.flaggingMode = !this.flaggingMode;
      this._render();
    }
  }

  _explode = i => {
    this.gameState = 'lost';
    this.flaggingMode = false;
    this.endTime = Date.now();
  };

  _openCell = i => {
    const cell = this.cells[i];

    if (this.openedCells === 0) {
      const [cells, minedCells] = genCells(this.arena, this.minesCountTotal, i);
      this.cells = cells;
      this.minedCells = minedCells;
      this.startTimer();
    }
    if (cell & CELL_MINED) {
      this._explode(i);
    } else if (!(cell & CELL_OPENED)) {
      let cellsToOpen = [i];

      for (let x = 0; x < cellsToOpen.length; x++) {
        if (!getCellNeighborMines(this.cells[cellsToOpen[x]])) {
          const neighborCells = getNeighborCells(
            this.arena,
            cellsToOpen[x]
          ).filter(i => !cellsToOpen.includes(i));

          cellsToOpen.push(...neighborCells);
        }
      }

      cellsToOpen.forEach(i => {
        this.cells[i] = (this.cells[i] | CELL_OPENED)
        this.openedCells++;
      });

      this.cells = [...this.cells];

      const restCells = this.cells
        .map((cell, i) => (cell & CELL_OPENED) ? null : i)
        .filter(cell => cell !== null);

      if (arraysCompare(this.minedCells, restCells)) {
        this.gameState = 'won';
        this.flaggingMode = false;
        this.stopTimer();
      }
    }
  };

  _openNeighborCells = i => {
    const cell = this.cells[i];
    if (!(cell & CELL_MINED)) {
      const neighborCells = getNeighborCells(this.arena, i);
      const flaggedNeighborsCount = neighborCells
        .map(i => this.cells[i])
        .filter(cell => !!(cell & CELL_FLAGGED)).length;

      if (flaggedNeighborsCount === getCellNeighborMines(cell)) {
        neighborCells
          .map(i => [i, this.cells[i]])
          .filter(([i, cell]) => !(cell & CELL_FLAGGED))
          .forEach(([i]) => this._openCell(i));
      }
    }
  };

  flagCell = i => {
    if (this.gameState !== 'playing') return;

    const cell = this.cells[i];
    if (!(cell & CELL_OPENED)) {
      this.cells[i] = toggleCellFlag(cell);
      this.cells = [...this.cells];
      (this.cells[i] & CELL_FLAGGED) ? this.flaggedCells++ : this.flaggedCells--;
    }
    this._render();
  };

  getCells() {
    return this.cells;
  }

  _countFlaggedCells() {
    return this.cells.filter(cell => !!(cell & CELL_FLAGGED)).length;
  }

  _countOpenedCells() {
    return this.cells.filter(cell => !!(cell & CELL_OPENED)).length;
  }

  getStats() {
    return {
      gameState: this.gameState,
      arena: this.arena,
      minesCountTotal: this.minesCountTotal,
      minesCountLeft: this.gameState === 'won'
        ? 0
        : this.minesCountTotal - this.flaggedCells,
      opened: this.openedCells,
      flagged: this.flaggedCells,
      timerValue: this.startTime ? (this.endTime || Date.now()) - this.startTime : null,
      endTime: this.endTime,
      flaggingMode: this.flaggingMode
    };
  }

  reset = () => {
    const [cells, minedCells] = genCells(this.arena, 0, 0);
    this.stopTimer();

    this.openedCells = 0;
    this.flaggedCells = 0;
    this.gameState = 'playing';
    this.cells = cells;
    this.minedCells = minedCells;
    this.startTime = null;
    this.endTime = null;
    this.flaggingMode = false;

    this._render();
  };

  _render() {
    this.redrawFn();
  }
}
