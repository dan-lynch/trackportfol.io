import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none !important',
  },
  amount: {
    fontSize: '0.875rem',
    color: 'darkslategray',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '1rem',
  },
}));

type Props = {
  amount: string;
  code: string;
  description: string;
  key: number;
};

const InstrumentView: React.FC<Props> = (props) => {
  const { amount, code, description } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {code} <span className={classes.amount}>{parseInt(amount).toFixed(3)}</span>
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default InstrumentView;
