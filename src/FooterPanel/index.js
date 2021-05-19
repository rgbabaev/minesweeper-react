import React from "react";
import { Button, ControlsPanel, Switcher } from "@tarantool.io/ui-kit";
import b_ from 'b_';
import { ZOOM_STEP } from '../constants';
import "./styles.css";

const b = b_.lock('FooterPanel');

export const FooterPanel = ({
  flaggingMode,
  zoom,
  onFlaggingSwitch,
  onZoomChange
}) => (
  <ControlsPanel
    className={b()}
    controls={[
      <Button
        key='+'
        className={b('zoomButton')}
        text='+'
        size='xs'
        onClick={() => onZoomChange(zoom + ZOOM_STEP)}
      />,
      <Button
        key='-'
        className={b('zoomButton')}
        text='-'
        size='xs'
        onClick={() => onZoomChange(zoom - ZOOM_STEP)}
      />,
      <Switcher
        key='f'
        onChange={onFlaggingSwitch}
        title='Flag'
        checked={flaggingMode}
      >
        Flag
      </Switcher>
    ]}
  />
);
