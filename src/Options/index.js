import React, { useState } from "react";
import { Button, Modal, LabeledInput } from '@tarantool.io/ui-kit';

const toInt = next => e => next(parseInt(e.target.value, 10) || 0);

export const Options = ({ arena, mines, onApply, onClose }) => {
  const [w, setW] = useState(arena[0]);
  const [h, setH] = useState(arena[1]);
  const [m, setM] = useState(mines);

  return (
    <Modal
      title='Options'
      onSubmit={e => {
        e.preventDefault();
        onApply([w, h], m);
        onClose();
      }}
      onClose={onClose}
    >
      <LabeledInput label='Width' value={w} onChange={e => toInt(setW)(e)} />
      <LabeledInput label='Height' value={h} onChange={e => toInt(setH)(e)} />
      <LabeledInput label='Mines' value={m} onChange={e => toInt(setM)(e)} />
      <Button type="submit" intent='primary'>Apply</Button>
    </Modal>
  );
};
