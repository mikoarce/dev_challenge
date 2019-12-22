import React from 'react';
import { Form } from 'semantic-ui-react';

const numberValidator = (input) => {
  const defaultError = { hasError: true, message: 'Input must be a whole number' };
  const noError = { hasError: false };

  if (input === '') {
    return noError;
  }

  if (Number.isNaN(Number(input))) {
    return defaultError;
  }

  const currVal = Number(input);
  return currVal % 1 === 0 ? noError : defaultError;
};

const GetPrimeMedianForm = () => {
  const [max, setMax] = React.useState('');
  const [maxFieldError, setMaxFieldError] = React.useState(undefined);

  const onMaxChange = React.useCallback((_, { value }) => {
    const { hasError, message } = numberValidator(value);
    if (hasError) {
      setMaxFieldError({ content: message });
    } else {
      setMaxFieldError(undefined);
    }
    setMax(value);
  }, []);

  return (
    <Form>
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

export default React.memo(GetPrimeMedianForm);
