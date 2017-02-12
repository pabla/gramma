import 'whatwg-fetch';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRandom } from '../actions/tests';
import styles from './App.css';
import Question from './Question';
import Answer from './Answer';

const defaultState = {
  questionIndex: 0,
  answerIndex: null,
  displayQuestionResults: false,
  correctCount: 0,
  incorrectCount: 0,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.onAnotherTestButtonClick = this.onAnotherTestButtonClick.bind(this);
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.state = { ...defaultState };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRandom());
  }

  componentWillReceiveProps() {
    this.setState({ ...defaultState });
  }

  onNextButtonClick() {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      displayQuestionResults: false,
    }));
  }

  onAnotherTestButtonClick() {
    const { dispatch } = this.props;
    dispatch(fetchRandom());
  }

  onSelectAnswer(index, isCorrect) {
    const state = {
      answerIndex: index,
      displayQuestionResults: true,
    };
    if (isCorrect) {
      this.setState(prevState => ({
        ...state,
        correctCount: prevState.correctCount + 1,
      }));
    } else {
      this.setState(prevState => ({
        ...state,
        incorrectCount: prevState.incorrectCount + 1,
      }));
    }
  }

  render() {
    const {
      questionIndex,
      displayQuestionResults,
      answerIndex,
      correctCount,
      incorrectCount,
    } = this.state;
    const { test } = this.props;
    if (!test) {
      return <div className={styles.root}>Loading...</div>;
    }
    const question = test.questions[questionIndex];
    const hasMoreQuestions = questionIndex < test.questions.length - 1;
    let actionsEl;
    if (displayQuestionResults) {
      if (hasMoreQuestions) {
        actionsEl = <span onClick={this.onNextButtonClick} className={styles.button}>Next</span>;
      } else {
        actionsEl = (
          <div>
            <div className={styles.results}>
              <strong>Results:</strong>
              <div>Correct answers: <strong>{correctCount}</strong></div>
              <div>Incorrect answers: <strong>{incorrectCount}</strong></div>
            </div>
            <span onClick={this.onAnotherTestButtonClick} className={styles.button}>
              Give me another test
            </span>
          </div>
        );
      }
    }
    return (
      <div className={styles.root}>
        <h1>{test.title}</h1>
        <div>{questionIndex + 1} of {test.questions.length}.</div>
        <Question title={question.title}>
          {question.answers.map((answer, i) => (
            <Answer
              key={i}
              index={i}
              value={answer.value}
              correct={answer.correct}
              onSelect={this.onSelectAnswer}
              selected={answerIndex === i}
              displayResult={displayQuestionResults}
            />
          ))}
        </Question>
        {actionsEl}
      </div>
    );
  }
}

App.propTypes = {
  test: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    test: state.tests.test,
  };
}

export default connect(mapStateToProps)(App);
