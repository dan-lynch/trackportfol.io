import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StockCharts from 'components/StockChart';
import SearchStock from 'components/SearchStock';
import { AppContext } from 'context/AppContext';
import { apiService } from 'services/apiService';
import { userService } from 'services/userService';
import { useQuery, Mutation } from 'react-apollo';
import { Instrument, Holding } from 'helpers/types';
import { gaService } from 'services/gaService';
import InstrumentView from 'components/InstrumentView';

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
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}));

const Dashboard: React.FC<Props> = () => {
  const [holdings, setHoldings] = useState<Holding[] | null>(null);
  const [searchInstrument, setSearchInstrument] = useState<Instrument | null>(null);
  const [instrumentToAdd, setInstrumentToAdd] = useState<Instrument | null>(null);
  const [instrumentIdToAdd, setInstrumentIdToAdd] = useState<number | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState<number | undefined>(0.00);
  const [userId, setUserId] = useState<number | null>(null);

  const classes = useStyles();
  const appContext = useContext(AppContext);
  const currentUserQuery = useQuery(apiService.currentUser);

  useEffect(() => {
    if (!currentUserQuery.error && currentUserQuery.data) {
      setHoldings(currentUserQuery.data.currentUser.holdingsByUserId.nodes);
      setUserId(currentUserQuery.data.currentUser.id);
      userService.storeUserData(currentUserQuery.data);
    }
  }, [currentUserQuery]);

  async function processSearch(searchQuery: Instrument | null) {
    if (searchQuery && searchQuery.code) {
      setSearchInstrument(searchQuery);
      appContext.setStock(searchQuery.code);
      gaService.viewStockchartEvent();
    }
  }

  async function updateInstrumentToAdd(instrument: Instrument | null) {
    if (instrument) {
      setInstrumentToAdd(instrument);
      setInstrumentIdToAdd(instrument.id);
    }
  }

  async function updateQuantityToAdd(quantity: any) {
    if (!isNaN(quantity)) {
      setQuantityToAdd(quantity);
    }
  }

  async function onAddConfirm(data: any) {
    gaService.addInstrumentSuccessEvent();
  }

  async function onAddError(error: any) {
    gaService.addInstrumentFailedEvent();
    console.info(error);
  }

  return (
    <AppContext.Consumer>
      {({ stock }) => (
        <React.Fragment>
          <Container className={classes.dashboard} maxWidth='lg'>
            <Paper>
              <Grid container spacing={3}>
                {/* Left column */}
                <Grid item md={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant='h5'>
                        Welcome to your Dashboard
                        {userService.loggedInUser && `, ${userService.loggedInUser.firstName}!`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant='h5'>Your holdings</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      {holdings && holdings.length > 0 ? (
                        holdings.map((holding, key) => {
                          return (
                            <InstrumentView
                              key={key}
                              amount={holding.amount}
                              code={holding.instrumentByInstrumentId.code}
                              description={holding.instrumentByInstrumentId.description}
                            />
                          );
                        })
                      ) : (
                        <Typography variant='body1'>You have no holdings.</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* Right column */}
                <Grid item md={6}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant='h5'>Add holding</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <SearchStock id='add-holding-search' value={instrumentToAdd} setValue={updateInstrumentToAdd} />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <TextField
                        id='add-holding-quantity'
                        label='Quantity'
                        type='number'
                        value={quantityToAdd}
                        onChange={(e) => updateQuantityToAdd(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Mutation
                        mutation={apiService.createHolding}
                        variables={{ userId, instrumentId: instrumentIdToAdd, amount: quantityToAdd }}
                        onCompleted={(data: any) => onAddConfirm(data)}
                        onError={(error: any) => onAddError(error)}>
                        {(mutation: any) => (
                          <Button className={classes.button} variant='contained' color='primary' onClick={mutation}>
                            Add Holding
                          </Button>
                        )}
                      </Mutation>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant='h5'>View stockchart</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <SearchStock id='view-stockchart-search' value={searchInstrument} setValue={processSearch} />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      {stock && <StockCharts stock={stock} />}
                    </Grid>
                  </Grid>
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
