import React from "react";
import b_ from "b_";
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
  const opened = cell.opened || (gameState === "lost" && ((cell.mined && !cell.flagged) || (!cell.mined && cell.flagged)));

  const content = opened
    ? cell.mined
      ? '🦠'
      : cell.flagged && gameState === "lost"
        ? "❌"
        : cell.neighborMines
    : cell.flagged || gameState === "won"
      ? "🚩"
      : null;

  return (
    <div
      className={b({ opened: opened, closed: !opened })}
      style={{ width: cellSize, height: cellSize }}
      key={i}
      data-neighbor-mines={cell.neighborMines}
      onClick={() => onCellOpen(i)}
      onContextMenu={e => {
        e.preventDefault();
        onCellFlag(i);
      }}
    >
      {content}
    </div>
  );
};
