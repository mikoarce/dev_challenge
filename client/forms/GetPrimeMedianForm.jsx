import React from 'react';
import { Form } from 'semantic-ui-react';

const GetPrimeMedianForm = () => {
  const [max, setMax] = React.useState('');
  const onMaxChange = React.useCallback((_, { value }) => setMax(value), []);
  return (
    <Form>
      <Form.Input
        label="Max Number"
        name="max"
        value={max}
        onChange={onMaxChange}
      />
      <Form.Button content="Submit" />
    </Form>
  );
};

export default React.memo(GetPrimeMedianForm);
