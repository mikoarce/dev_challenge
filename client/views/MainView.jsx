import React from 'react';
import { Grid } from 'semantic-ui-react';
import PrimeMedianView from './PrimeMedianView';

const MainView = () => (
  <Grid centered padded="horizontally">
    <Grid.Row>
      <Grid.Column>
        <PrimeMedianView />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default MainView;
