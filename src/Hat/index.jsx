import React from 'react';
import { Button, ControlGroup, Text } from '@blueprintjs/core';
import b_ from 'b_';
import './styles.css';

const b = b_.lock('Hat');

export const Hat = ({
  gameState,
  minesLeftCount,
  timerValue,
  onOptionsClick,
  onResetClick,
}) => (
  <ControlGroup className={b()} thin>
    <Text key='c' className={b('output')} title='Mines counter'>
      💣{minesLeftCount}
    </Text>
    <Text key='t' className={b('output')} title='Timer'>
      ⏱{timerValue === null ? 0 : Math.round(timerValue / 1000)}
    </Text>
    <Button
      key='n'
      onClick={onResetClick}
      title='New game (Space)'
      intent={gameState === 'playing' ? 'secondary' : 'primary'}
    >
      {gameState === 'playing' ? '🙂' : gameState === 'won' ? '😎' : '😵'}
      New game
    </Button>
    <Button key='o' onClick={onOptionsClick} title='Options'>
      Options
    </Button>
  </ControlGroup>
);
