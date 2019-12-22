import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const formMessageProps = (primes, errorMsg) => {
  if (errorMsg) {
    return {
      error: true,
      content: `The following error has occurred: ${errorMsg}`,
    };
  }
  if (primes) {
    return {
      success: true,
      content: primes.length === 0
        ? 'No prime numbers found.'
        : `Median prime number(s): ${primes.join(', ')}`,
    };
  }

  return { content: 'Results will show up here' };
};

const Result = ({ primes, errorMsg }) => {
  const { success, error, content } = formMessageProps(primes, errorMsg);
  return (
    <Message
      success={success}
      error={error}
      content={content}
    />
  );
};

Result.propTypes = {
  primes: PropTypes.arrayOf(PropTypes.number),
  errorMsg: PropTypes.string,
};

Result.defaultProps = {
  primes: undefined,
  errorMsg: '',
};

export default React.memo(Result);
