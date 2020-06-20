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
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { AppContext } from 'context/AppContext'
import { graphqlService } from 'services/graphql'
import { gaService } from 'services/gaService'
import { userService } from 'services/userService'
import NotificationComponent, { Notification } from 'components/Notification'

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
      },
    },
  })
)

type Props = {
  switchToJoin: () => any
}

export default function Login(props: Props) {
  const { switchToJoin } = props

  const [notification, setNotification] = useState<Notification>({show: false})
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const classes = useStyles()
  const appContext = useContext(AppContext)
  const [loginMutation] = useMutation(graphqlService.LOGIN)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({show: false, type: notification.type})
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
    userService.logout()
    gaService.loginFailedEvent()
    setNotification({show: true, message: 'Sign in unsuccessful, please try again', type: 'error'})
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
      setNotification({show: true, message: 'Account created successfully! You can now sign in', type: 'success'})
    }
  }, [])

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Sign in</Typography>
        </Grid>
        <Collapse in={notification.show} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <NotificationComponent
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({show: false, type: notification.type})}
            />
          </Grid>
        </Collapse>
        <Grid item xs={12} className={classes.margin}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='email'
              inputRef={register({
                required: 'Please enter your email address',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "This doesn't look quite right. Please enter your email address.",
                },
              })}
              name='email'
              label='Email Address'
              defaultValue={!!appContext.signupEmail ? appContext.signupEmail : ''}
              variant='outlined'
              fullWidth
              autoFocus
              autoComplete='on'
              autoCapitalize='off'
              helperText={errors.email?.message}
              error={!!errors.email}
            />
            <TextField
              id='password'
              inputRef={register({
                required: 'Please enter your password',
              })}
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              fullWidth
              autoComplete='off'
              helperText={errors.password?.message}
              error={!!errors.password}
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
