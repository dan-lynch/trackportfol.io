import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { AppContext } from 'context/ContextProvider'
import { gaService } from 'services/gaService'
import { authService } from 'services/authService'
import NotificationComponent, { Notification } from 'components/Notification'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '32rem',
      padding: '1rem 0.5rem',
    },
    end: {
      alignItems: 'flex-end',
      textAlign: 'end',
    },
    white: {
      color: 'white',
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
  openSignupForm: () => any
  openForgotPassForm: () => any
}

export default function Login(props: Props) {
  const { openSignupForm, openForgotPassForm } = props

  const classes = useStyles()
  const router = useRouter()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { email, password } = values
    const isAuthenticated = await authService.signin(email, password)
    if (isAuthenticated) {
      gaService.loginSuccessEvent()
      setLoading(false)
      router.push('/dashboard')
    } else {
      onError()
    }
  }

  const onError = () => {
    authService.signout()
    gaService.loginFailedEvent()
    setNotification({ show: true, message: 'Sign in unsuccessful, please try again', type: 'error' })
    setLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (appContext.signupEmail) {
      setNotification({ show: true, message: 'Account created successfully! You can now sign in', type: 'success' })
    }
  }, [])

  useEffect(() => {
    if (appContext.resetPassSuccess) {
      setNotification({ show: true, message: 'Password updated successfully! You can now sign in', type: 'success' })
      appContext.setResetPassSuccess(false)
    }
  }, [])

  return (
    <React.Fragment>
      <Collapse in={notification.show}>
        <Grid item xs={12}>
          <NotificationComponent
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ show: false, type: notification.type })}
          />
        </Grid>
      </Collapse>
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='email'
            inputRef={register({
              required: 'Please enter your email address',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "This doesn't look quite right, please enter your email address.",
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
          <Typography align='right'>
            <Link
              type='button'
              className={appContext.isDarkTheme ? classes.white : ''}
              component='button'
              variant='body2'
              onClick={openForgotPassForm}>
              Forgot password?
            </Link>
          </Typography>
          <Button
            type='submit'
            aria-label='Sign in'
            fullWidth
            variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
            color='secondary'>
            {loading ? <CircularProgress size={24} className={classes.white} /> : 'Sign in'}
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' align='center'>
          Don't have an account?
          <Button color='secondary' onClick={openSignupForm}>
            Sign up
          </Button>
        </Typography>
      </Grid>
    </React.Fragment>
  )
}
