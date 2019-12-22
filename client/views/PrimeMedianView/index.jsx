import React from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';
import GetPrimeMedianForm from 'forms/GetPrimeMedianForm';

const PrimeMedianView = () => (
  <Segment>
    <Header>
      Get Prime Median
      <Header.Subheader>
        Find the median of all prime numbers less than a given whole number.
      </Header.Subheader>
    </Header>
    <Divider />
    <GetPrimeMedianForm />
  </Segment>
);

export default PrimeMedianView;
