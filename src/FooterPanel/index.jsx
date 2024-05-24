import React from 'react';
import { Button, ControlGroup, Switch } from '@blueprintjs/core';
import b_ from 'b_';
import { ZOOM_STEP } from '../constants';
import './styles.css';

const b = b_.lock('FooterPanel');

export const FooterPanel = ({
  flaggingMode,
  zoom,
  onFlaggingSwitch,
  onZoomChange,
}) => (
  <ControlGroup>
    <Button text='+' size='xs' onClick={() => onZoomChange(zoom + ZOOM_STEP)} />
    <Button text='-' size='xs' onClick={() => onZoomChange(zoom - ZOOM_STEP)} />
    <Switch onChange={onFlaggingSwitch} title='Flag' checked={flaggingMode}>
      Flag
    </Switch>
  </ControlGroup>
);
