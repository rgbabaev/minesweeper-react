import React from "react";
import {
  Button,
  ControlsPanel,
  Switcher,
  Text
} from '@tarantool.io/ui-kit';
import b_ from 'b_';
import './styles.css';

const b = b_.lock('Hat');

export const Hat = ({
  flaggingMode,
  gameState,
  minesLeftCount,
  timerValue,
  onFlaggingSwitch,
  onOptionsClick,
  onResetClick
}) => (
  <ControlsPanel
    className={b()}
    controls={[
      <Text className={b('output')} title='Mines counter'>💣{minesLeftCount}</Text>,
      <Text className={b('output')} title='Timer'>⏱{timerValue === null ? 0 : Math.round(timerValue / 1000)}</Text>,
      <Button onClick={onResetClick} title='New game (Space)' intent={gameState === 'playing' ? 'secondary' : 'primary'}>
        {gameState === "playing" ? "🙂" : gameState === "won" ? "😎" : "😵"}
        New game
      </Button>,
      <Switcher onChange={onFlaggingSwitch} title="Flag" checked={flaggingMode}>Flag</Switcher>,
      <Button onClick={onOptionsClick} title="Options">Options</Button>
    ]}
  />
);
