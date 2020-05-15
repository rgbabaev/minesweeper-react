import React, { useState } from "react";
import {
  Button,
  Modal,
  LabeledInput,
  RadioButton,
  FormField
} from '@tarantool.io/ui-kit';
import b_ from 'b_';
import './styles.css';

const b = b_.lock('Options');

const adjustMinesCount = (w, h, m) => m >= w * h
  ? w * h - 1
  : m;

export const Options = ({ arena, mines, onApply, onClose }) => {
  const [{ w, h, m }, setState] = useState({ w: arena[0], h: arena[1], m: mines });

  const set = key => e => {
    let value = parseInt(e.target.value, 10) || 0;
    value = value > 100 ? 100 : value;
    setState(({ w, h, m }) => ({ w, h, m, [key]: value }));
  }

  const setMines = e => {
    const value = parseInt(e.target.value, 10) || 0;
    setState(({ w, h }) => ({
      w,
      h,
      m: adjustMinesCount(w, h, value),
    }))
  }

  const recalcValues = () => setState(state => {
    let { w, h, m } = state;
    w = w < 2 ? 2 : w;
    h = h < 2 ? 2 : h;
    m = adjustMinesCount(w, h, m);

    return { w, h, m };
  });

  return (
    <Modal
      title='Options'
      onSubmit={e => {
        e.preventDefault();
        onApply([w, h], adjustMinesCount(w, h, m));
        onClose();
      }}
      onClose={onClose}
      footerControls={[
        <Button type="button" onClick={onClose}>Cancel</Button>,
        <Button type="submit" intent='primary'>Apply</Button>
      ]}
    >
      <div className={b('inner')}>
        <FormField label='Level'>
          <RadioButton
            name='level'
            onChange={() => setState({ w: 9, h: 9, m: 10 })}
            checked={w === 9 && h === 9 && m === 10 }
          >
            Beginner (9x9, 10 mines)
          </RadioButton>
          <RadioButton
            name='level'
            onChange={() => setState({ w: 16, h: 16, m: 40 })}
            checked={w === 16 && h === 16 && m === 40 }
          >
            Intermidiate (16x16, 40 mines)
          </RadioButton>
          <RadioButton
            name='level'
            onChange={() => setState({ w: 30, h: 16, m: 99 })}
            checked={w === 30 && h === 16 && m === 99 }
          >
            Expert (30x16, 99 mines)
          </RadioButton>
        </FormField>
        <div className={b('inputs')}>
          <LabeledInput className={b('labeledInput')} onBlur={recalcValues} label='Width' value={w} onChange={set('w')} />
          <LabeledInput className={b('labeledInput')} onBlur={recalcValues} label='Height' value={h} onChange={set('h')} />
          <LabeledInput className={b('labeledInput')} onBlur={recalcValues} label='Mines' value={m} onChange={setMines} />
        </div>
      </div>
    </Modal>
  );
};
