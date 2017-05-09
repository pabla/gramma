import React, { PropTypes } from 'react';
import styles from './Question.css';

const Question = ({ title, children }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: title }} />
    <ul className={styles.items}>
      {children}
    </ul>
  </div>
);

Question.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Question;
