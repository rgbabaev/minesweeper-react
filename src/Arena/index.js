import React, { memo } from "react";
import b_ from "b_";
import "./styles.css";

const b = b_.lock("Arena");
const cellSize = 28;

export const Arena = ({
  cells = [],
  size,
  onCellFlag,
  onCellOpen,
  gameState
}) => (
  <div className={b()}>
    <div
      className={b('inner')}
      style={{
        width: size[0] * cellSize,
        height: size[1] * cellSize
      }}
    >
      {cells.map((cell, i) => {
        const opened = cell.opened || (gameState === "lost" && cell.mined);

        return (
          <div
            className={b("cell", { opened: opened, closed: !opened })}
            style={{ width: cellSize, height: cellSize }}
            key={i}
            data-neighbor-mines={cell.neighborMines}
            onClick={() => onCellOpen(i)}
            onContextMenu={e => {
              e.preventDefault();
              onCellFlag(i);
            }}
          >
            {opened
              ? cell.mined
                ? "💣"
                : cell.neighborMines
              : cell.flagged || gameState === "won"
              ? "🚩"
              : null}
          </div>
        );
      })}
    </div>
  </div>
);

export const PureArena = memo(Arena);
