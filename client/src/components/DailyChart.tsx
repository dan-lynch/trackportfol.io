import React from 'react';
import { Grid, Header, Input, Label, Container, Button, Divider } from 'semantic-ui-react';
import StockCharts from 'components/StockChart';
import { StockContext } from 'context/StockContext';

type Props = {};

const DailyChart: React.FC<Props> = () => {
  return (
    <StockContext.Consumer>
      {({ stock, setStock, userInputStock, setUserInputStock }) => (
        <Grid textAlign="center" style={{ height: '90%' }} verticalAlign="middle" padded>
          <Grid.Column style={{ maxWidth: '90%' }}>
            <Header as="h2" color="teal" textAlign="center">
              Daily CandlestickChart
            </Header>
            <Label>Enter stock:</Label>
            <Input type="text" value={userInputStock} onChange={(e) => setUserInputStock(e.target.value)} />
            <Button onClick={() => setStock(userInputStock)}>Fetch Stock</Button>
            <Divider />
            <Container>
              {stock ? <StockCharts stock={stock} /> : <p>Enter a stock code and click 'Fetch Stock' to view chart.</p>}
            </Container>
          </Grid.Column>
        </Grid>
      )}
    </StockContext.Consumer>
  );
};

export default DailyChart;
