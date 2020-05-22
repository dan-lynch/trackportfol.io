import React from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StockCharts from 'components/StockChart';
import { AppContext } from 'context/AppContext';

type Props = {};

const useStyles = makeStyles(() => ({
  dashboard: {
    minWidth: '5rem',
    minHeight: '5rem',
  },
  gridItem: {
    alignItems: 'center',
    justify: 'center',
    margin: '0 2rem',
  },
  button: {
    height: '3.8rem',
    width: '10rem',
    marginLeft: '1rem',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}));

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {({ stock, setStock, userInputStock, setUserInputStock }) => (
        <React.Fragment>
          <Container className={classes.dashboard} maxWidth='lg'>
            <Paper>
              <Grid container spacing={3}>
                <Grid item xs={12} className={classes.gridItem}>
                  <Typography variant='h4'>Dashboard</Typography>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <TextField
                    id='searchstock'
                    name='searchstock'
                    label='Enter Stock'
                    variant='outlined'
                    value={userInputStock}
                    onChange={(e) => setUserInputStock(e.target.value)}
                  />
                  <Button
                    variant='contained'
                    className={classes.button}
                    color='primary'
                    onClick={() => setStock(userInputStock)}>
                    Search
                  </Button>
                </Grid>
                <Divider />
                <Grid item xs={12} className={classes.gridItem}>
                  {stock ? (
                    <StockCharts stock={stock} />
                  ) : (
                    <Typography>Enter a stock code and click 'Fetch Stock' to view chart.</Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
};

export default Dashboard;
