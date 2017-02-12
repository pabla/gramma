const test = require('ava');
const { default: reducer } = require('./tests');
const { changeTest, clearSkippedTests } = require('../actions/tests');

test('change test', t => {
  const test1 = { id: 1 };
  const state1 = reducer(undefined, changeTest(test1));
  t.deepEqual(state1, {
    test: test1,
    skippedIds: [1],
  });
  const test2 = { id: 3 };
  const state2 = reducer(state1, changeTest(test2));
  t.deepEqual(state2, {
    test: test2,
    skippedIds: [1, 3],
  });
});

test('clear skipped tests', t => {
  const state1 = {
    skippedIds: [3, 8, 4],
  };
  const state2 = reducer(state1, clearSkippedTests());
  t.deepEqual(state2, {
    skippedIds: [],
  });
});
