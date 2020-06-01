import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { Card, CardContent, Typography, IconButton, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { apiService } from 'services/apiService';
import { isNumeric } from 'helpers/misc';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none !important',
    marginBottom: '0',
    paddingTop: '0.5rem',
  },
  code: {
    fontSize: '1.2rem',
  },
  amount: {
    fontSize: '0.875rem',
    color: 'darkslategray',
    paddingRight: '0.5rem',
    marginLeft: '0.5rem',
    width: '5rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '0 0 0 1rem',
    '&:last-child': {
      paddingBottom: '1rem',
    },
  },
  button: {
    padding: '0.5rem',
  },
  update: {
    marginLeft: '0.5rem',
    width: '5rem',
  },
  input: {
    padding: 0,
    margin: 0,
    marginTop: '0.5rem',
  },
}));

type Props = {
  amount: string;
  code: string;
  description: string;
  key: number;
  userId: number;
  instrumentId: number;
  onUpdateSuccess: any;
  onUpdateError: any;
  onDeleteSuccess: any;
  onDeleteError: any;
};

const InstrumentView: React.FC<Props> = (props) => {
  const {
    amount,
    code,
    description,
    userId,
    instrumentId,
    onUpdateSuccess,
    onUpdateError,
    onDeleteSuccess,
    onDeleteError,
  } = props;
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateQuantity, setUpdateQuantity] = useState<number>(parseFloat(amount));
  const classes = useStyles();

  const InputProps = {
    className: classes.input,
  };

  const updateState = () => {
    setIsEditing((currentIsEditing) => !currentIsEditing);
  };

  async function changeUpdateQuantity(quantity: any) {
    if (isNumeric(quantity) || quantity === '') {
      setUpdateQuantity(quantity);
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant='h5' className={classes.code}>
          {code}
          {isEditing ? (
            <TextField
              id='update-holding-quantity'
              type='number'
              className={classes.update}
              inputProps={InputProps}
              margin='none'
              value={updateQuantity}
              onChange={(e) => changeUpdateQuantity(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              size='small'
            />
          ) : (
            <span className={classes.amount}>{parseFloat(amount).toFixed(3)}</span>
          )}
          {isEditing ? (
            <Mutation
              mutation={apiService.updateHolding}
              variables={{ userId, instrumentId, amount: updateQuantity }}
              onCompleted={(data: any) => {
                setUpdateLoading(false);
                setIsEditing(false);
                onUpdateSuccess(data);
              }}
              onError={(error: any) => {
                setUpdateLoading(false);
                onUpdateError(error);
              }}>
              {(mutation: any) => (
                <IconButton
                  className={classes.button}
                  aria-label='Update Holding'
                  onClick={() => {
                    setUpdateLoading(true);
                    mutation();
                  }}>
                  {updateLoading ? <CircularProgress size={16} /> : <DoneIcon />}
                </IconButton>
              )}
            </Mutation>
          ) : (
            <IconButton className={classes.button} aria-label='Edit Holding' onClick={updateState}>
              <EditIcon />
            </IconButton>
          )}
          <Mutation
            mutation={apiService.deleteHolding}
            variables={{ userId, instrumentId }}
            onCompleted={(data: any) => {
              setDeleteLoading(false);
              onDeleteSuccess(data);
            }}
            onError={(error: any) => {
              setDeleteLoading(false);
              onDeleteError(error);
            }}>
            {(mutation: any) => (
              <IconButton
                className={classes.button}
                aria-label='Delete Holding'
                onClick={() => {
                  setDeleteLoading(true);
                  mutation();
                }}>
                {deleteLoading ? <CircularProgress size={16} /> : <DeleteIcon />}
              </IconButton>
            )}
          </Mutation>
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InstrumentView;
