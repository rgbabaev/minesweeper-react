import React from "react";
import { Arena } from "../Arena";
import { Hat } from "../Hat";
import { Minesweeper } from "../core";
import { Options } from "../Options";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };

    this.game = new Minesweeper(null, null, this.forceUpdate.bind(this));
  }

  toggleOptions = () =>
    this.setState(({ showOptions }) => ({ showOptions: !showOptions }));

  newGame = (arena = [10, 10], mines = 25) => this.game.configure(arena, mines);

  render() {
    const { flaggingMode, gameState, minesCountTotal, arena, flagged, timerValue } = this.game.getStats();
    const { showOptions } = this.state;

    return (
      <div className="App">
        <Hat
          flaggingMode={flaggingMode}
          gameState={gameState}
          timerValue={timerValue}
          minesLeftCount={minesCountTotal - flagged}
          onResetClick={this.game.reset}
          onOptionsClick={this.toggleOptions}
          onFlaggingSwitch={this.game.toggleFlaggingMode}
        />
        <Arena
          gameState={gameState}
          size={arena}
          cells={this.game.getCells()}
          onCellOpen={this.game.handleCellClick}
          onCellFlag={this.game.flagCell}
          onResetClick={this.game.reset}
        />
        {showOptions && (
          <Options
            onApply={this.newGame}
            onClose={this.toggleOptions}
            arena={arena}
            mines={minesCountTotal}
          />
        )}
      </div>
    );
  }
}
