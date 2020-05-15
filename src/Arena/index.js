import React, { memo } from "react";
import b_ from "b_";
import { ArenaCell } from '../ArenaCell';
import "./styles.css";

const b = b_.lock("Arena");
const cellSize = 28;

export const Arena = ({
  cells = [],
  size,
  onCellFlag,
  onCellOpen,
  gameState,
  onResetClick
}) => (
  <div
    className={b()}
    tabIndex={0}
    onKeyPress={e => e.charCode === 32 && onResetClick()}
  >
    <div
      className={b('inner')}
      style={{
        width: size[0] * cellSize,
        height: size[1] * cellSize
      }}
    >
      {cells.map((cell, i) => {
        return (
          <ArenaCell
            cell={cell}
            cellSize={cellSize}
            i={i}
            key={i}
            onCellOpen={onCellOpen}
            onCellFlag={onCellFlag}
            gameState={gameState}
          />
        );
      })}
    </div>
  </div>
);

export const PureArena = memo(Arena);
