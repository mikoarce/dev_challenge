import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

/**
 * Field validator logic that checks if the input:
 * - is a whole number
 * - is less than or equal to 0
 * @param input {string} - Input string to verify
 * @returns {string|undefined} - Error message, or undefined if no error is found.
 */
const numberValidator = (input) => {
  if (input === '') {
    return undefined;
  }

  if (Number.isNaN(Number(input))) {
    return 'Input must be a whole number';
  }

  const currVal = Number(input);
  if (currVal <= 0) {
    return 'Input must be greater than 0';
  }

  return currVal % 1 === 0 ? undefined : 'Input must be a whole number';
};

const GetPrimeMedianForm = ({ onSubmit, loading }) => {
  const [max, setMax] = React.useState('');
  const [maxFieldError, setMaxFieldError] = React.useState(undefined);

  const onMaxChange = React.useCallback((_, { value }) => {
    const message = numberValidator(value);
    if (message) {
      setMaxFieldError({ content: message });
    } else {
      setMaxFieldError(undefined);
    }
    setMax(value);
  }, []);

  const onFormSubmit = React.useCallback(() => {
    if (onSubmit) {
      onSubmit(max);
    }
  }, [max, onSubmit]);

  return (
    <Form className="prime-median-form" onSubmit={onFormSubmit}>
      <Form.Input
        label="Max Number"
        name="max"
        value={max}
        onChange={onMaxChange}
        error={maxFieldError}
      />
      <Form.Button
        primary
        content="Submit"
        disabled={max.length === 0 || !!maxFieldError || loading}
        loading={loading}
      />
    </Form>
  );
};

GetPrimeMedianForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

GetPrimeMedianForm.defaultProps = {
  onSubmit: undefined,
  loading: false,
};

export default React.memo(GetPrimeMedianForm);
