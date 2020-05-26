import React, { useEffect, useContext, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StockCharts from 'components/StockChart';
import SearchStock from 'components/SearchStock';
import { AppContext } from 'context/AppContext';
import { apiService } from 'services/apiService';
import { userService } from 'services/userService';
import { useQuery } from 'react-apollo';
import { Instrument, Holding } from 'helpers/types';

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
  const [instruments, setInstruments] = useState<Instrument[] | []>([]);
  const [searchInstrument, setSearchInstrument] = useState<Instrument | null>(null);

  const classes = useStyles();
  const appContext = useContext(AppContext);

  const currentUserQuery = useQuery(apiService.currentUser);
  const instrumentsQuery = useQuery(apiService.allInstruments);

  useEffect(() => {
    if (!currentUserQuery.error && currentUserQuery.data) {
      setHoldings(currentUserQuery.data.currentUser.holdingsByUserId.nodes);
      userService.storeUserData(currentUserQuery.data);
    }
  }, [currentUserQuery]);

  useEffect(() => {
    if (!instrumentsQuery.error && instrumentsQuery.data) {
      setInstruments(instrumentsQuery.data.allInstruments.nodes);
    }
  }, [instrumentsQuery]);

  async function processSearch(searchQuery: Instrument | null) {
    if (searchQuery && searchQuery.code) {
      setSearchInstrument(searchQuery);
      appContext.setStock(searchQuery.code);
    }
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
                            <Typography key={key} variant='body1'>
                              {holding.amount}x {holding.instrumentByInstrumentId.code} 
                              ({holding.instrumentByInstrumentId.description})
                            </Typography>
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
                      <Typography variant='h5'>Search stocks</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <SearchStock instruments={instruments} value={searchInstrument} setValue={processSearch} />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      {stock ? (
                        <StockCharts stock={stock} />
                      ) : (
                        <Typography>Enter a stock code and click 'Fetch Stock' to view chart.</Typography>
                      )}
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
