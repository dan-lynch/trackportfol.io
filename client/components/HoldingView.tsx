import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Collapse,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import NumberFormat from 'react-number-format'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { gaService } from 'services/gaService'
import { isNumeric } from 'helpers/misc'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0.5rem 0',
    paddingTop: '0.5rem',
  },
  amount: {
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.only('md')]: {
      paddingRight: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '4rem',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '0 0 0 0.5rem',
    '&:last-child': {
      paddingBottom: '0.25rem',
    },
  },
  button: {
    padding: '0.5rem',
  },
  delete: {
    textAlign: 'right',
    padding: '0 0.25rem 0 0',
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
  collapse: {
    width: '100%',
    padding: '0 0.5rem'
  },
  right: {
    textAlign: 'right',
  },
  value: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
      paddingTop: '0.125rem',
    },
  },
  code: {
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.125rem',
    },
  },
  loading: {
    marginTop: '0.25rem',
    [theme.breakpoints.down('md')]: {
      marginRight: '0.5rem',
    },
    [theme.breakpoints.only('md')]: {
      marginRight: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: '3rem',
    },
  }
}))

type Props = {
  amount: string
  code: string
  price: string
  userId: number
  instrumentId: number
}

export default function HoldingView(props: Props) {
  const { amount, code, price, userId, instrumentId } = props
  const classes = useStyles()

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [updateQuantity, setUpdateQuantity] = useState<number>(parseFloat(amount))

  const [updateHolding] = useMutation(graphqlService.UPDATE_HOLDING)
  const [deleteHolding] = useMutation(graphqlService.DELETE_HOLDING)

  const handleUpdateHolding = () => {
    setUpdateLoading(true)
    updateHolding({ variables: { userId, instrumentId, amount: updateQuantity } })
      .then(() => {
        setUpdateLoading(false)
        setIsEditing(false)
        gaService.updateInstrumentSuccessEvent()
        setNotification({ show: true, message: 'Holding updated successfully', type: 'success' })
      })
      .catch(() => {
        setUpdateLoading(false)
        setIsEditing(false)
        gaService.updateInstrumentFailedEvent()
        setNotification({ show: true, message: 'Failed to update holding!', type: 'error' })
      })
  }

  const handleDeleteHolding = () => {
    setDeleteLoading(true)
    deleteHolding({ variables: { userId, instrumentId } })
      .then(() => {
          setDeleteLoading(false)
          gaService.deleteInstrumentSuccessEvent()
      })
      .catch(() => {
        setDeleteLoading(false)
        gaService.deleteInstrumentFailedEvent()
        setNotification({ show: true, message: 'Failed to delete holding', type: 'error' })
      })
  }

  const InputProps = {
    className: classes.input,
  }

  const changeUpdateQuantity = (quantity: any) => {
    if (isNumeric(quantity) || quantity === '') {
      setUpdateQuantity(quantity)
    }
  }

  return (
    <React.Fragment>
      <Collapse in={notification.show} className={classes.collapse}>
        <Grid item xs={12}>
          <NotificationComponent
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ show: false, type: notification.type })}
          />
        </Grid>
      </Collapse>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid container spacing={0}>
            <Grid item xs={4} md={2}>
              <Typography variant='h5' className={classes.code}>
                {code}
              </Typography>
            </Grid>
            <Grid item xs={8} md={5} className={classes.amount}>
              {isEditing ? (
                <React.Fragment>
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
                  {updateLoading ? (
                    <CircularProgress size={20} className={classes.loading} />
                  ) : (
                    <React.Fragment>
                      <IconButton
                        className={classes.button}
                        aria-label='Confirm Update Holding'
                        onClick={handleUpdateHolding}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        aria-label='Cancel Update Holding'
                        onClick={() => setIsEditing(false)}>
                        <ClearIcon />
                      </IconButton>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <Typography className={classes.amount}>
                  {parseFloat(amount).toFixed(3)}
                  <IconButton
                    className={classes.button}
                    size='small'
                    aria-label='Update Holding'
                    onClick={() => setIsEditing(true)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                </Typography>
              )}
            </Grid>
            <Grid item xs={10} md={3}>
              <Typography variant='h5' className={classes.value}>
                <NumberFormat
                  value={parseFloat(price) * parseFloat(amount)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </Typography>
            </Grid>
            <Grid item xs={2} md={2} className={classes.delete}>
              <IconButton
                className={classes.button}
                size='small'
                aria-label='Delete Holding'
                onClick={handleDeleteHolding}>
                {deleteLoading ? <CircularProgress size={16} /> : <DeleteIcon fontSize='small' />}
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
