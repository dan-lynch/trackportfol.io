import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import {
  Grid,
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
import { AppContext } from 'context/ContextProvider'
import { graphqlService } from 'services/graphql'
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
    loading: {
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
  openLoginForm: () => any
}

export default function SignUp(props: Props) {
  const { openLoginForm } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [registerMutation] = useMutation(graphqlService.REGISTER_USER)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { username, email, password } = values
    registerMutation({ variables: { username, email, password } })
      .then((response: any) => {
        setLoading(false)
        response.data.registerUser ? onConfirm(email) : onError()
      })
      .catch(() => {
        setLoading(false)
        onError()
      })
  }

  async function onConfirm(email: string) {
    gaService.registerSuccessEvent()
    appContext.setSignupEmail(email)
    openLoginForm()
  }

  async function onError() {
    appContext.setIsLoggedIn(false)
    await authService.signout()
    gaService.registerFailedEvent()
    setNotification({
      show: true,
      message: 'Your account could not be created, please reload the page and try again',
      type: 'error',
    })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

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
            id='username'
            inputRef={register({
              required: 'Please enter your desired username',
              pattern: {
                value: /^[A-Z0-9.]{3,}$/i,
                message:
                  'Username must be at least three characters long, containing only letters (a-z), numbers (0-9), and periods (.)',
              },
            })}
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            autoFocus
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.username?.message}
            error={!!errors.username}
          />
          <TextField
            id='email'
            inputRef={register({
              required: 'Please enter your email address',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "This doesn't look quite right, please enter your email address",
              },
            })}
            name='email'
            label='Email Address'
            variant='outlined'
            fullWidth
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.email?.message}
            error={!!errors.email}
          />
          <TextField
            id='password'
            inputRef={register({
              required: 'Please enter your desired password',
              pattern: {
                value: /^.{6,}$/i,
                message: 'Password must be at least six characters long',
              },
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
            aria-label='Create Account'
            fullWidth
            variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
            color='secondary'>
            {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Create Account'}
          </Button>
        </form>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' align='center'>
          Already have an account?{' '}
          <Button color='secondary' onClick={openLoginForm}>
            Sign in
          </Button>
        </Typography>
      </Grid>
    </React.Fragment>
  )
}
