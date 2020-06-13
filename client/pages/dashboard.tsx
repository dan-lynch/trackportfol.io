import React, { useEffect, useContext, useState } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { Mutation } from '@apollo/react-components';
import { Grid, Paper, Typography, TextField, Button, CircularProgress, Collapse } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout'
import StockCharts from 'components/StockChart';
import SearchStock from 'components/SearchStock';
import InstrumentView from 'components/InstrumentView';
import { withApollo } from 'components/withApollo'
import { AppContext } from 'context/AppContext';
import { graphqlService } from 'services/graphql';
import { gaService } from 'services/gaService';
import { userService } from 'services/userService';
import { initApolloClient } from 'services/apolloService'
import { Instrument, Holding } from 'helpers/types';
import { isNumeric } from 'helpers/misc';

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
  },
}));

function Dashboard() {
  const [holdings, setHoldings] = useState<Holding[] | null>(null)
  const [searchInstrument, setSearchInstrument] = useState<Instrument | null>(null)
  const [instrumentToAdd, setInstrumentToAdd] = useState<Instrument | null>(null)
  const [instrumentIdToAdd, setInstrumentIdToAdd] = useState<number | null>(null)
  const [quantityToAdd, setQuantityToAdd] = useState<number | undefined>(0.0)
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<boolean>(false)
  const [failedMessage, setFailedMessage] = useState<boolean>(false)

  const classes = useStyles()
  const appContext = useContext(AppContext)
  const [currentUser] = useMutation(graphqlService.CURRENT_USER);

  useEffect(() => {
    currentUser({ variables: { clientMutationId: 'trackportfol.io' } }).then(response => {
      if (response.data.currentUser.user) {
        setHoldings(response.data.currentUser.user.holdingsByUserId.nodes)
        setUserId(response.data.currentUser.user.id)
        appContext.setIsLoggedIn(true);
        userService.storeUserData(response.data)
      } else {
        appContext.setIsLoggedIn(false)
        userService.logout()
        Router.push('/login')
      }
    });
  }, []);

  const processSearch = (searchQuery: Instrument | null) => {
    if (searchQuery && searchQuery.code) {
      setSearchInstrument(searchQuery)
      appContext.setStock(searchQuery.code)
      gaService.viewStockchartEvent()
    }
  }

  const updateInstrumentToAdd = (instrument: Instrument | null) => {
    if (instrument) {
      setInstrumentToAdd(instrument)
      setInstrumentIdToAdd(instrument.id)
    }
  }

  const updateQuantityToAdd = (quantity: any) => {
    if (isNumeric(quantity) || quantity === '') {
      setQuantityToAdd(quantity)
    }
  }

  const onAddConfirm = (data: any) => {
    gaService.addInstrumentSuccessEvent()
    setHoldings(data.createHolding.userByUserId.holdingsByUserId.nodes)
    setInstrumentToAdd(null)
    setInstrumentIdToAdd(null)
    setQuantityToAdd(0.0)
    setSuccessMessage(true)
  }

  const onAddError = (error: any) => {
    gaService.addInstrumentFailedEvent()
    setFailedMessage(true)
    console.warn(error)
  }

  const onUpdateSuccess = (data: any) => {
    gaService.updateInstrumentSuccessEvent()
    setHoldings(data.updateHoldingByUserIdAndInstrumentId.userByUserId.holdingsByUserId.nodes)
  }

  const onUpdateError = (error: any) => {
    gaService.updateInstrumentFailedEvent()
    console.warn(error)
  }

  const onDeleteSuccess = (data: any) => {
    gaService.deleteInstrumentSuccessEvent()
    setHoldings(data.deleteHoldingByUserIdAndInstrumentId.userByUserId.holdingsByUserId.nodes)
  }

  const onDeleteError = (error: any) => {
    gaService.deleteInstrumentFailedEvent()
    console.warn(error)
  }

  return (
  <Layout loggedIn={true} title="Dashboard | trackportfol.io">
     <Grid container spacing={3}>
        <Grid item xs={12} className={classes.welcome}>
          <Typography variant='subtitle1' className={classes.welcomeText}>
            {userService.loggedInUser && `Welcome to trackportfol.io, ${userService.loggedInUser.username}!`}
          </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h6' className={classes.holdings}>
              Your holdings
            </Typography>
            {userId ? (
              holdings && holdings.length > 0 ? (
                holdings.map((holding: Holding) => {
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
              )
            ) : (
              <div>
                <Skeleton variant='text' />
                <Skeleton variant='text' />
                <Skeleton variant='text' />
              </div>
            )}
          </Paper>
        </Grid>
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
            {userId ? (
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
                    mutation={graphqlService.CREATE_HOLDING}
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
            ) : (
              <Skeleton variant='text' />
            )}
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
              {appContext.stock && <StockCharts stock={appContext.stock} />}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
  </Layout>
  );
}

export async function getServerSideProps() {
  const client = await initApolloClient({})
  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(Dashboard)