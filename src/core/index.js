import { arraysCompare, genCells, getNeighborCells } from "./helpers";

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

  handleCellClick = i => {
    if (this.gameState !== "playing") return;

    const cell = this.cells[i];

    if (cell.flagged) return;

    if (cell.opened) this._openNeighborCells(i);
    else this._openCell(i);
    this._render();
  };

  _explode = i => {
    this.gameState = "lost";
  };

  _openCell = i => {
    const cell = this.cells[i];

    if (this.getStats().opened === 0) {
      this.cells = genCells(this.arena, this.minesCountTotal, i);
      this.minedCells = this.cells.filter(({ mined }) => mined);
      // start timer
    }
    if (cell.mined) {
      this._explode(i);
    } else if (!cell.opened) {
      let cellsToOpen = [i];

      for (let x = 0; x < cellsToOpen.length; x++) {
        if (!this.cells[cellsToOpen[x]].neighborMines) {
          const neighborCells = getNeighborCells(
            this.arena,
            cellsToOpen[x]
          ).filter(i => !cellsToOpen.includes(i));

          cellsToOpen.push(...neighborCells);
        }
      }

      cellsToOpen.forEach(i => {
        this.cells[i].opened = true;
        this.openedCells++;
      });

      const openedCells = this.cells.filter(({ opened }) => !opened);

      if (arraysCompare(this.minedCells, openedCells)) {
        this.gameState = "won";
      }
    }
  };

  _openNeighborCells = i => {
    const cell = this.cells[i];
    if (!cell.mined) {
      const neighborCells = getNeighborCells(this.arena, i);
      const flaggedNeighborsCount = neighborCells
        .map(i => this.cells[i])
        .filter(({ flagged }) => !!flagged).length;

      if (flaggedNeighborsCount === cell.neighborMines) {
        neighborCells
          .map(i => [i, this.cells[i]])
          .filter(([i, cell]) => !cell.flagged)
          .forEach(([i]) => this._openCell(i));
      }
    }
  };

  flagCell = i => {
    if (this.gameState !== "playing") return;

    const cell = this.cells[i];
    if (!cell.opened) {
      cell.flagged = !cell.flagged;
      cell.flagged ? this.flaggedCells++ : this.flaggedCells--;
    }
    this._render();
  };

  getCells() {
    return this.cells;
  }

  _countFlaggedCells() {
    return this.cells.filter(({ flagged }) => flagged === true).length;
  }

  _countOpenedCells() {
    return this.cells.filter(({ opened }) => opened === true).length;
  }

  getStats() {
    return {
      gameState: this.gameState,
      arena: this.arena,
      minesCountTotal: this.minesCountTotal,
      opened: this.openedCells,
      flagged: this.flaggedCells
    };
  }

  reset = () => {
    this.openedCells = 0;
    this.flaggedCells = 0;
    this.gameState = "playing";
    this.cells = genCells(this.arena, 0, 0);
    this.minedCells = [];
    this._render();
  };

  _render() {
    this.redrawFn();
  }
}
