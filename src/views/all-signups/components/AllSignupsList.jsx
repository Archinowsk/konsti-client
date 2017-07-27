import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import moment from 'moment';
// import { Link } from 'react-router-dom';
// import moment from 'moment';

const AllSignupsList = props => {
  const { t, results } = props;

  const sortedResults = results.map(result => {
    return (
      <p key={result.username}>
        {result.username}: {result.enteredGame.title} (location:{' '}
        {result.enteredGame.location})
      </p>
    );
  });

  return (
    <div>
      {sortedResults}
    </div>
  );
};

AllSignupsList.propTypes = {
  t: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
};

export default translate()(AllSignupsList);
