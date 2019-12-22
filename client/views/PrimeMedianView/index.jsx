import React from 'react';
import {
  Segment, Header, Divider, Message,
} from 'semantic-ui-react';
import GetPrimeMedianForm from 'forms/GetPrimeMedianForm';
import ApiService from 'utils/ApiService';
import Result from './Result';

const api = new ApiService();

const PrimeMedianView = () => {
  const [primes, setPrimes] = React.useState(undefined);
  const [errorMsg, setErrorMsg] = React.useState('');
  const onSubmit = React.useCallback((max) => {
    api.getMedianPrimes(max)
      .then(({ data }) => {
        const { data: primesData } = data;
        setErrorMsg('');
        setPrimes(primesData);
      }).catch((thrown) => {
        if (!ApiService.isCancel(thrown)) {
          setErrorMsg(thrown.message);
          setPrimes([]);
        }
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
      {!!primes ? <Result primes={primes} errorMsg={errorMsg} />
        : <Message content="Results will show up here" />}
    </Segment>
  );
};

export default React.memo(PrimeMedianView);
