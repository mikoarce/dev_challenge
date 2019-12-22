import React from 'react';
import {
  Grid, Header, Divider, Segment,
} from 'semantic-ui-react';

const MainView = () => (
  <Grid centered padded="horizontally">
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Header>
            Get Prime Medians
            <Header.Subheader>
              Find the median of all prime numbers less than a given whole number.
            </Header.Subheader>
          </Header>
          <Divider />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default MainView;
