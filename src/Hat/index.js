import React from "react";
import { Button, ControlsPanel, Text } from '@tarantool.io/ui-kit';
import b_ from 'b_';
import './styles.css';

const b = b_.lock('Hat');

export const Hat = ({
  gameState,
  minesLeftCount,
  timerValue,
  onFlagClick,
  onOptionsClick,
  onResetClick
}) => (
  <ControlsPanel
    className={b()}
    controls={[
      <Text>{minesLeftCount}</Text>,
      <Button onClick={onResetClick} title="New game" intent='secondary'>
        {gameState === "playing" ? "🙂" : gameState === "won" ? "😎" : "😵"}
      </Button>,
      <Text>{timerValue}</Text>,
      <Button onClick={onFlagClick} title="options">🚩</Button>,
      <Button onClick={onOptionsClick} title="options">️⚙</Button>
    ]}
  />
);
