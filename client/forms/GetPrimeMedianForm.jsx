import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const numberValidator = (input) => {
  if (input === '') {
    return {};
  }

  if (Number.isNaN(Number(input))) {
    return { message: 'Input must be a whole number' };
  }

  const currVal = Number(input);
  if (currVal <= 0) {
    return { message: 'Input must be greater than 0' };
  }

  return currVal % 1 === 0 ? {} : { message: 'Input must be a whole number' };
};

const GetPrimeMedianForm = ({ onSubmit }) => {
  const [max, setMax] = React.useState('');
  const [maxFieldError, setMaxFieldError] = React.useState(undefined);

  const onMaxChange = React.useCallback((_, { value }) => {
    const { message } = numberValidator(value);
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
    <Form onSubmit={onFormSubmit}>
      <Form.Input
        label="Max Number"
        name="max"
        value={max}
        onChange={onMaxChange}
        error={maxFieldError}
      />
      <Form.Button
        content="Submit"
        disabled={max.length === 0 || !!maxFieldError}
      />
    </Form>
  );
};

GetPrimeMedianForm.propTypes = {
  onSubmit: PropTypes.func,
};

GetPrimeMedianForm.defaultProps = {
  onSubmit: undefined,
};

export default React.memo(GetPrimeMedianForm);
