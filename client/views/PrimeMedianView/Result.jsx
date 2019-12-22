import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

/**
 * Helper function that determines how the Message component should look like (success vs error).
 * @param primes {number[]} - List of prime numbers to display
 * @param errorMsg {string|undefined} - Error message to display
 * @returns {object} - Props passed to the Message component.
 */
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
