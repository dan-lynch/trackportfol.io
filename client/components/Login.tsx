import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Alert } from '@material-ui/lab'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { AppContext } from 'context/AppContext'
import { graphqlService } from 'services/graphql'
import { gaService } from 'services/gaService'
import { userService } from 'services/userService'

const useStyles = makeStyles((theme) =>
  createStyles({
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
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0),
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1, 0),
      }
    },
  })
)

type Props = {
  switchToJoin: () => any
}

export default function Login(props: Props) {
  const { switchToJoin } = props

  const [defaultEmail, setDefaultEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [failedMessage, setFailedMessage] = useState<boolean>(false)
  const [registeredMessage, setRegisteredMessage] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const classes = useStyles()
  const appContext = useContext(AppContext)
  const [loginMutation] = useMutation(graphqlService.LOGIN)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    const { email, password } = values
    loginMutation({ variables: { email, password } })
      .then((response) => {
        setLoading(false)
        response.data.authenticate.jwtToken ? onConfirm(response.data) : onError('Sign in failed')
      })
      .catch(() => {
        setLoading(false)
        onError('Sign in failed')
      })
  }

  async function onConfirm(data: any) {
    const loginResult = await userService.login(data.authenticate)
    if (loginResult) {
      appContext.setIsLoggedIn(true)
      gaService.loginSuccessEvent()
      window.location.replace('/dashboard')
    } else {
      onError('Sign in failed')
    }
  }

  async function onError(error?: any) {
    appContext.setIsLoggedIn(false)
    gaService.loginFailedEvent()
    setFailedMessage(true)
    console.info(error)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (appContext.signupEmail) {
      setDefaultEmail(appContext.signupEmail)
      setRegisteredMessage(true)
      appContext.setSignupEmail('')
    }
  }, [appContext])

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Sign in</Typography>
        </Grid>
        <Collapse in={failedMessage} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='error' onClose={() => setFailedMessage(false)}>
              Sign in unsuccessful, please try again
            </Alert>
          </Grid>
        </Collapse>
        <Collapse in={registeredMessage} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <Alert severity='success' onClose={() => setRegisteredMessage(false)}>
              Account created successfully! You can now sign in
            </Alert>
          </Grid>
        </Collapse>
        <Grid item className={classes.margin}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='email'
              inputRef={register({ required: true })}
              name='email'
              label='Email Address'
              defaultValue={defaultEmail ? defaultEmail : ''}
              variant='outlined'
              fullWidth
              autoFocus
              autoComplete='on'
              autoCapitalize='off'
              helperText={!!errors.email ? 'Please enter your email address' : ''}
              error={!!errors.email}
            />
            <TextField
              id='password'
              inputRef={register({ required: true })}
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              fullWidth
              autoComplete='off'
              helperText={!!errors.email ? 'Please enter your password' : ''}
              error={!!errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type='submit'
              className={classes.button}
              aria-label='Sign in'
              variant='contained'
              fullWidth
              color='primary'>
              {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Sign in'}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='body1' align='center'>
            Don't have an account?
            <Button color='primary' onClick={switchToJoin}>
              Sign up
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
