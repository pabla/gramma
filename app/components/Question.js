import React, { PropTypes } from 'react';

const Question = ({ title, children }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: title }} />
    <ul>
      {children}
    </ul>
  </div>
);

Question.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Question;
