import React from "react";
import { Button, ControlsPanel, Switcher } from "@tarantool.io/ui-kit";
import b_ from 'b_';
import "./styles.css";

const b = b_.lock('FooterPanel');

export const FooterPanel = ({ flaggingMode, zoom, onFlaggingSwitch, onZoomChange }) => (
  <ControlsPanel
    className={b()}
    controls={[
      <Button className={b('zoomButton')} text='+' size='xs' onClick={() => onZoomChange(zoom + 0.5)} />,
      <Button className={b('zoomButton')} text='-' size='xs' onClick={() => onZoomChange(zoom - 0.5)} />,
      <Switcher onChange={onFlaggingSwitch} title="Flag" checked={flaggingMode}>Flag</Switcher>
    ]}
  />
);
