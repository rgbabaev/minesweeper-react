import { describe, it } from 'node:test';
import assert from 'node:assert';
import times from './times.mjs';
// import { times } from 'ramda';

describe('Runs function', () => {
  it('0 times', ({ mock }) => {
    const fn = mock.fn((i) => i * 2);
    const result = times(fn, 0);
    assert.strictEqual(fn.mock.callCount(), 0);
    assert.deepStrictEqual(result, []);
  });

  it('1 time', ({ mock }) => {
    const fn = mock.fn((i) => i * 2);
    const result = times(fn, 1);
    assert.strictEqual(fn.mock.callCount(), 1);
    assert.deepStrictEqual(result, [0]);
  });

  it('8 times', ({ mock }) => {
    const fn = mock.fn((i) => i * 2);
    const result = times(fn, 8);
    assert.strictEqual(fn.mock.callCount(), 8);
    assert.deepStrictEqual(result, [0, 2, 4, 6, 8, 10, 12, 14]);
  });
});
