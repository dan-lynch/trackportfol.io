import React, { useEffect, useContext, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, CircularProgress, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
import { isNumeric } from 'helpers/misc';

type Props = {};

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1rem',
    flex: '1 0 auto',
    marginBottom: '1.5rem',
  },
  flex: {
    display: 'flex',
  },
  welcome: {
    padding: '1rem 0 0 1rem !important',
  },
  welcomeText: {
    padding: '0',
  },
  subtitle: {
    paddingBottom: '1rem',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  loading: {
    color: 'white',
  },
  collapse: {
    marginBottom: '1rem',
  },
  holdings: {
    paddingBottom: '1rem',
  }
}));

const Dashboard: React.FC<Props> = () => {
  const [holdings, setHoldings] = useState<Holding[] | null>(null);
  const [searchInstrument, setSearchInstrument] = useState<Instrument | null>(null);
  const [instrumentToAdd, setInstrumentToAdd] = useState<Instrument | null>(null);
  const [instrumentIdToAdd, setInstrumentIdToAdd] = useState<number | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState<number | undefined>(0.000);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<boolean>(false);

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
    if (isNumeric(quantity) || quantity === '') {
      setQuantityToAdd(quantity);
    }
  }

  async function onAddConfirm(data: any) {
    gaService.addInstrumentSuccessEvent();
    setHoldings(data.createHolding.query.currentUser.holdingsByUserId.nodes);
    setInstrumentToAdd(null);
    setInstrumentIdToAdd(null);
    setQuantityToAdd(0.0);
    setSuccessMessage(true);
  }

  async function onAddError(error: any) {
    gaService.addInstrumentFailedEvent();
    setFailedMessage(true);
    console.info(error);
  }

  async function onUpdateSuccess(data: any) {
    gaService.updateInstrumentSuccessEvent();
    setHoldings(data.updateHoldingByUserIdAndInstrumentId.query.currentUser.holdingsByUserId.nodes);
  }

  async function onUpdateError(error: any) {
    gaService.updateInstrumentFailedEvent();
    console.info(error);
  }


  async function onDeleteSuccess(data: any) {
    gaService.deleteInstrumentSuccessEvent();
    setHoldings(data.deleteHoldingByUserIdAndInstrumentId.query.currentUser.holdingsByUserId.nodes);
  }

  async function onDeleteError(error: any) {
    gaService.deleteInstrumentFailedEvent();
    console.info(error);
  }


  return (
    <AppContext.Consumer>
      {({ stock }) => (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.welcome}>
              <Typography variant='subtitle1' className={classes.welcomeText}>
                {userService.loggedInUser && `Welcome to trackportfol.io, ${userService.loggedInUser.firstName}!`}
              </Typography>
            </Grid>
            {/* Left column */}
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <Typography variant='h6' className={classes.holdings}>Your holdings</Typography>
                {userId ? holdings && holdings.length > 0 ? (
                  holdings.map((holding) => {
                    return (
                      <InstrumentView
                        key={holding.instrumentByInstrumentId.id}
                        amount={holding.amount}
                        code={holding.instrumentByInstrumentId.code}
                        description={holding.instrumentByInstrumentId.description}
                        userId={userId}
                        instrumentId={holding.instrumentByInstrumentId.id}
                        onDeleteSuccess={onDeleteSuccess}
                        onDeleteError={onDeleteError}
                        onUpdateSuccess={onUpdateSuccess}
                        onUpdateError={onUpdateError}
                      />
                    );
                  })
                ) : (
                  <Typography variant='body1'>You have no holdings.</Typography>
                ) : <Typography variant='body1'>Loading your holdings...</Typography>}
              </Paper>
            </Grid>
            {/* Right column */}
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant='h6' className={classes.subtitle}>
                    Add holding
                  </Typography>
                </Grid>
                <Collapse in={successMessage}>
                  <Grid item xs={12}>
                    <Alert severity='success' onClose={() => setSuccessMessage(false)} className={classes.collapse}>
                      Holding added successfully
                    </Alert>
                  </Grid>
                </Collapse>
                <Collapse in={failedMessage}>
                  <Grid item xs={12}>
                    <Alert severity='error' onClose={() => setFailedMessage(false)} className={classes.collapse}>
                      Failed to add holding
                    </Alert>
                  </Grid>
                </Collapse>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    <SearchStock id='add-holding-search' value={instrumentToAdd} setValue={updateInstrumentToAdd} />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <TextField
                      id='add-holding-quantity'
                      label='Quantity'
                      type='number'
                      fullWidth
                      value={quantityToAdd}
                      onChange={(e) => updateQuantityToAdd(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} className={classes.flex}>
                    <Mutation
                      mutation={apiService.createHolding}
                      variables={{ userId, instrumentId: instrumentIdToAdd, amount: quantityToAdd }}
                      onCompleted={(data: any) => {
                        setLoading(false);
                        onAddConfirm(data);
                      }}
                      onError={(error: any) => {
                        setLoading(false);
                        onAddError(error);
                      }}>
                      {(mutation: any) => (
                        <Button
                          className={classes.button}
                          aria-label='Add Holding'
                          fullWidth
                          variant='contained'
                          color='primary'
                          onClick={() => {
                            setLoading(true);
                            mutation();
                          }}>
                          {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Add'}
                        </Button>
                      )}
                    </Mutation>
                  </Grid>
                </Grid>
              </Paper>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <Typography variant='h6' className={classes.subtitle}>
                    View stockchart
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <SearchStock id='view-stockchart-search' value={searchInstrument} setValue={processSearch} />
                </Grid>
                <Grid item xs={12}>
                  {stock && <StockCharts stock={stock} />}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </AppContext.Consumer>
  );
};

export default Dashboard;
