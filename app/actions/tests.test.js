const test = require('ava');
const { shuffleTest } = require('./tests');

test('shuffle test', t => {
  const data = {
    id: 1,
    title: 'First Conditional',
    questions: [
      {
        value: 'If you ____ careful, you will have an accident.',
        answers: [
          {
            value: 'aren\'t',
            correct: true,
            feedback: 'Correct',
          },
          {
            value: 'won\'t be',
            correct: false,
            feedback: 'Incorrect. You can make the future continuous with will or going to.',
          },
          {
            value: 'won\'t',
            correct: false,
            feedback: 'Incorrect',
          },
        ],
      },
      {
        value: 'Complete the question. What will you do if ___?',
        answers: [
          {
            value: 'everything goes wrong?',
            correct: true,
            feedback: 'Correct',
          },
          {
            value: 'everything will go wrong?',
            correct: false,
            feedback: 'Incorrect',
          },
          {
            value: 'everything might go wrong?',
            correct: false,
            feedback: 'Incorrect',
          },
        ],
      },
    ],
  };
  const shuffled = shuffleTest(data);
  t.is(shuffled.id, data.id);
  t.truthy(shuffled);
  t.not(shuffled, data);
});
