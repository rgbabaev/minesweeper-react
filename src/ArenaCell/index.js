import React, { memo, useState } from "react";
import b_ from "b_";
import { getCellNeighborMines, CELL_FLAGGED, CELL_OPENED, CELL_MINED } from '../core/helpers';
import "./styles.css";

const b = b_.lock("ArenaCell");

export const ArenaCell = ({
  cell,
  i,
  cellSize,
  onCellFlag,
  onCellOpen,
  gameState
}) => {
  const [pressed, setPressed] = useState(false);

  const opened =
    (cell & CELL_OPENED)
    || (
      gameState === "lost" && (
        ((cell & CELL_MINED) && !(cell & CELL_FLAGGED))
        || (!(cell & CELL_MINED) && (cell & CELL_FLAGGED))
      )
    );

  const content = opened
    ? (cell & CELL_MINED)
      ? '🦠'
      : (cell & CELL_FLAGGED) && gameState === "lost"
        ? "❌"
        : getCellNeighborMines(cell) || ''
    : (cell & CELL_FLAGGED) || gameState === "won"
      ? "🚩"
      : null;

  return (
    <div
      className={b({
        opened: !!opened,
        closed: !opened,
        pressed: pressed && !opened
      })}
      style={{ width: cellSize, height: cellSize }}
      key={i}
      data-neighbor-mines={getCellNeighborMines(cell)}
      onClick={() => onCellOpen(i)}
      onMouseDown={e => !pressed && (e.buttons & 1) && setPressed(true)}
      onMouseUp={() => pressed && setPressed(false)}
      onMouseLeave={e => pressed && setPressed(false)}
      onMouseEnter={e => (e.buttons & 1) && setPressed(true)}
      onContextMenu={e => {
        e.preventDefault();
        onCellFlag(i);
      }}
      // onTouchStart={() => onCellOpen(i)}
    >
      {content}
    </div>
  );
};

export const PureArenaCell = memo(ArenaCell);
