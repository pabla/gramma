import shuffle from 'lodash/shuffle';
export const CHANGE_TEST = 'CHANGE_TEST';

function changeTest(test) {
  return {
    type: CHANGE_TEST,
    test,
  };
}

export function shuffleTest(test) {
  return {
    title: test.title,
    questions: shuffle(test.questions).map(question => ({
      title: question.title,
      answers: shuffle(question.answers),
    })),
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
  return dispatch => {
    getContents()
      .then(contents => {
        const ids = contents.map(test => test.id);
        const id = ids[Math.floor(Math.random() * ids.length)];
        return getTest(id);
      })
      .then(test => {
        dispatch(changeTest(shuffleTest(test)));
      });
  };
}
