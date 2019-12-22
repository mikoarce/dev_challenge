import React from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';
import GetPrimeMedianForm from 'forms/GetPrimeMedianForm';
import ApiService from 'utils/ApiService';

const api = new ApiService();

const PrimeMedianView = () => {
  const onSubmit = React.useCallback((max) => {
    api.getMedianPrimes(max)
      .then((resp) => {
        console.log(resp);
      }).catch((thrown) => {
        console.log(thrown);
      });
  }, []);

  return (
    <Segment>
      <Header>
        Get Prime Median
        <Header.Subheader>
          Find the median of all prime numbers less than a given whole number.
        </Header.Subheader>
      </Header>
      <Divider />
      <GetPrimeMedianForm onSubmit={onSubmit} />
    </Segment>
  );
};

export default React.memo(PrimeMedianView);
