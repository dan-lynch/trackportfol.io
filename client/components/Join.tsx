import React, { useState, useContext } from 'react'
import { Mutation } from '@apollo/react-components'
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Collapse,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { AppContext } from 'context/AppContext'
import { graphqlService } from 'services/graphql'
import { gaService } from 'services/gaService'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '32rem',
    padding: '1rem 0.5rem',
  },
  margin: {
    margin: '0 0.5rem',
  },
  end: {
    alignItems: 'flex-end',
    textAlign: 'end',
  },
  button: {
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  loading: {
    color: 'white',
  },
  collapse: {
    width: '100%',
    margin: '0px 1rem',
  },
}))

type Props = {
  switchToLogin: () => any
}

export default function Join(props: Props) {
  const { switchToLogin } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [failedMessage, setFailedMessage] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  async function onConfirm(data: any) {
    if (data.registerUser) {
      gaService.registerSuccessEvent()
      appContext.setSignupEmail(email)
      switchToLogin()
    } else {
      onError('Sign in failed')
    }
  }

  async function onError(error: any) {
    gaService.registerFailedEvent()
    setFailedMessage(true)
    console.warn(error)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Create your account</Typography>
        </Grid>
        <Collapse in={failedMessage} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='error' onClose={() => setFailedMessage(false)}>
              Account was not created, please try again
            </Alert>
          </Grid>
        </Collapse>
        <Grid item xs={12} className={classes.margin}>
          <TextField
            id='username'
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            autoComplete='on'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <TextField
            id='email'
            name='email'
            label='Email Address'
            variant='outlined'
            fullWidth
            autoComplete='on'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Mutation
            mutation={graphqlService.REGISTER}
            variables={{ username, email, password }}
            onCompleted={(data: any) => {
              setLoading(false)
              onConfirm(data)
            }}
            onError={(error: any) => {
              setLoading(false)
              onError(error)
            }}>
            {(mutation: any) => (
              <Button
                className={classes.button}
                aria-label='Create Account'
                variant='contained'
                fullWidth
                color='primary'
                onClick={() => {
                  setLoading(true)
                  mutation()
                }}>
                {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Create Account'}
              </Button>
            )}
          </Mutation>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='body1' align='center'>
            Already have an account? <Button color='primary' onClick={switchToLogin}>Sign in</Button>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}