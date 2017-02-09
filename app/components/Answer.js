import React, { PropTypes } from 'react';
import styles from './Answer.css';

const Answer = ({ value, index, correct, onSelect, selected, displayResult }) => {
  const classes = [styles.item];
  if (displayResult) {
    classes.push(styles.result);
    if (correct) {
      classes.push(styles.correctResult);
    } else {
      classes.push(styles.incorrectResult);
    }
    if (selected) {
      classes.push(styles.selectedResult);
    }
    return <li className={classes.join(' ')}>{value}</li>;
  }
  classes.push(styles.variant);
  return <li onClick={() => onSelect(index, correct)} className={classes.join(' ')}>{value}</li>;
};

Answer.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  correct: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  displayResult: PropTypes.bool.isRequired,
};

export default Answer;
