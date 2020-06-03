import React, { memo } from "react";
import b_ from "b_";
import { ArenaCell } from '../ArenaCell';
import "./styles.css";

const b = b_.lock("Arena");
const cellSize = 28;

export class Arena extends React.Component {
  static defaultProps = { zoom: 1 };

  state = {
    width: null,
    height: null
  };

  innerRef = React.createRef();

  componentDidMount() {
    const innerElement = this.innerRef && this.innerRef.current;

    if (innerElement) {
      const { width, height } = innerElement.getBoundingClientRect();
      this.setState({ width, height });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zoom !== this.props.zoom) {
      const innerElement = this.innerRef && this.innerRef.current;

      if (innerElement) {
        const { width, height } = innerElement.getBoundingClientRect();
        this.setState({ width, height });
      }
    }
  }

  render() {
    const {
      cells = [],
      size,
      onCellFlag,
      onCellOpen,
      gameState,
      onResetClick,
      zoom
    } = this.props;

    const {
      width,
      height
    } = this.state;
  
    return (
      <div
        className={b()}
        tabIndex={0}
        onKeyPress={e => e.charCode === 32 && onResetClick()}
      >
        <div className={b('wrap')} style={{ width, height }}>
          <div
            className={b('inner')}
            style={{
              width: size[0] * cellSize,
              height: size[1] * cellSize,
              transform: `scale(${zoom})`
            }}
            ref={this.innerRef}
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
      </div>
    );
  }
}

export const PureArena = memo(Arena);
