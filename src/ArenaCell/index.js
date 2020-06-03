import React, { useState } from "react";
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
  const [pressed, setPressed] = useState(false);

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
      className={b({
        opened: opened,
        closed: !opened,
        pressed: pressed && !opened
      })}
      style={{ width: cellSize, height: cellSize }}
      key={i}
      data-neighbor-mines={cell.neighborMines}
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
