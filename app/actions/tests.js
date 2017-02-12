import shuffle from 'lodash/shuffle';

export const CHANGE_TEST = 'CHANGE_TEST';

export function changeTest(test) {
  return {
    type: CHANGE_TEST,
    test,
  };
}

export function shuffleTest(test) {
  return {
    ...test,
    questions: shuffle(test.questions).map(question => ({
      ...question,
      answers: shuffle(question.answers),
    })),
  };
}

export const CLEAR_SKIPPED_TESTS = 'CLEAR_SKIPPED_TESTS';

export function clearSkippedTests() {
  return {
    type: CLEAR_SKIPPED_TESTS,
  };
}

const getContents = (() => {
  let promise;
  return () => {
    if (!promise) {
      promise = fetch('/tests/contents.json')
        .then(res => res.json());
    }
    return promise;
  };
})();

function getTest(id) {
  return fetch(`/tests/${id}.json`)
    .then(res => res.json());
}

export function fetchRandom() {
  return (dispatch, getState) => {
    getContents()
      .then(contents => {
        const ids = contents.map(test => test.id);
        const state = getState();
        let availableIds = ids.filter(id => !state.tests.skippedIds.includes(id));
        if (availableIds.length === 0) {
          availableIds = ids;
          dispatch(clearSkippedTests());
        }
        const id = ids[Math.floor(Math.random() * ids.length)];
        return getTest(id);
      })
      .then(test => {
        dispatch(changeTest(shuffleTest(test)));
      });
  };
}
