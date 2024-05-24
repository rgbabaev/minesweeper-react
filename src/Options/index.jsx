import React, { useState } from 'react';
import {
  Button,
  ControlGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  Radio,
  InputGroup,
  RadioGroup,
} from '@blueprintjs/core';
import b_ from 'b_';
import './styles.css';

const b = b_.lock('Options');

const adjustMinesCount = (w, h, m) => (m >= w * h ? w * h - 1 : m);

export const Options = ({ arena, mines, onApply, onClose, isOpen }) => {
  const [{ w, h, m }, setState] = useState({
    w: arena[0],
    h: arena[1],
    m: mines,
  });

  const set = (key) => (e) => {
    let value = parseInt(e.target.value, 10) || 0;
    value = value > 100 ? 100 : value;
    setState(({ w, h, m }) => ({ w, h, m, [key]: value }));
  };

  const setMines = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setState(({ w, h }) => ({
      w,
      h,
      m: adjustMinesCount(w, h, value),
    }));
  };

  const recalcValues = () =>
    setState((state) => {
      let { w, h, m } = state;
      w = w < 2 ? 2 : w;
      h = h < 2 ? 2 : h;
      m = adjustMinesCount(w, h, m);

      return { w, h, m };
    });

  return (
    <Dialog title='Options' onClose={onClose} isOpen={isOpen}>
      <DialogBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApply([w, h], adjustMinesCount(w, h, m));
            onClose();
          }}
        >
          <RadioGroup
            label='Level'
            selectedValue={`${w}_${h}_${m}`}
            onChange={(event) => {
              const [w, h, m] = event.currentTarget.value
                .split('_')
                .map(Number);
              setState({ w, h, m });
            }}
          >
            <Radio name='level' value='9_9_10'>
              Beginner (9x9, 10 mines)
            </Radio>
            <Radio name='level' value='16_16_40'>
              Intermidiate (16x16, 40 mines)
            </Radio>
            <Radio name='level' value='30_16_99'>
              Expert (30x16, 99 mines)
            </Radio>
          </RadioGroup>
          <ControlGroup fill>
            <FormGroup label='Width' labelFor='options_dialog_w'>
              <InputGroup
                id='options_dialog_w'
                onBlur={recalcValues}
                value={w}
                onChange={set('w')}
              />
            </FormGroup>
            <FormGroup label='Height' labelFor='options_dialog_h'>
              <InputGroup
                id='options_dialog_h'
                onBlur={recalcValues}
                value={h}
                onChange={set('h')}
              />
            </FormGroup>
            <FormGroup label='Mines' labelFor='options_dialog_m'>
              <InputGroup
                id='options_dialog_m'
                onBlur={recalcValues}
                value={m}
                onChange={setMines}
              />
            </FormGroup>
            {/* TODO: Show mined cells percent from total cells */}
          </ControlGroup>
          <DialogFooter
            minimal={true}
            actions={[
              <Button key='Cancel' type='button' onClick={onClose}>
                Cancel
              </Button>,
              <Button key='Apply' type='submit' intent='primary'>
                Apply
              </Button>,
            ]}
          />
        </form>
      </DialogBody>
    </Dialog>
  );
};
