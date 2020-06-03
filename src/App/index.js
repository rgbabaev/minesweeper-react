import React from "react";
import { Arena } from "../Arena";
import { FooterPanel } from "../FooterPanel";
import { Hat } from "../Hat";
import { Minesweeper } from "../core";
import { Options } from "../Options";
import "./styles.css";

function preventZoom(event) {
  event = event.originalEvent || event;
  if(event.scale !== undefined && event.scale !== 1) event.preventDefault();
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      zoom: 1
    };

    this.game = new Minesweeper(null, null, this.forceUpdate.bind(this));
  }

  componentDidMount() {
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('dblclick', preventZoom, { passive: false });
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', preventZoom, { passive: false });
    document.removeEventListener('dblclick', preventZoom, { passive: false });
  }

  toggleOptions = () =>
    this.setState(({ showOptions }) => ({ showOptions: !showOptions }));

  handleZoomChange = zoom => zoom && this.setState({ zoom });

  newGame = (arena = [10, 10], mines = 25) => this.game.configure(arena, mines);

  render() {
    const { flaggingMode, gameState, minesCountTotal, arena, flagged, timerValue } = this.game.getStats();
    const { showOptions, zoom } = this.state;

    return (
      <div className="App">
        <Hat
          gameState={gameState}
          timerValue={timerValue}
          minesLeftCount={minesCountTotal - flagged}
          onResetClick={this.game.reset}
          onOptionsClick={this.toggleOptions}
        />
        <Arena
          gameState={gameState}
          size={arena}
          cells={this.game.getCells()}
          onCellOpen={this.game.handleCellClick}
          onCellFlag={this.game.flagCell}
          onResetClick={this.game.reset}
          zoom={zoom}
        />
        <FooterPanel
          flaggingMode={flaggingMode}
          zoom={zoom}
          onFlaggingSwitch={this.game.toggleFlaggingMode}
          onZoomChange={this.handleZoomChange}
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
