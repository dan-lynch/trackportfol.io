import React, { useState, useContext } from 'react'
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
  switchToLogin: () => any
}

export default function Join(props: Props) {
  const { switchToLogin } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [loading, setLoading] = useState<boolean>(false)
  const [failedMessage, setFailedMessage] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [registerMutation] = useMutation(graphqlService.REGISTER)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    const { username, email, password } = values
    registerMutation({ variables: { username, email, password } })
      .then((response) => {
        setLoading(false)
        response.data.authenticate.jwtToken ? onConfirm(response.data, email) : onError('Register failed')
      })
      .catch(() => {
        setLoading(false)
        onError('Register failed')
      })
  }

  async function onConfirm(data: any, email: string) {
    if (data.registerUser) {
      gaService.registerSuccessEvent()
      appContext.setSignupEmail(email)
      switchToLogin()
    } else {
      onError('Register failed')
    }
  }

  async function onError(error?: any) {
    gaService.registerFailedEvent()
    setFailedMessage(true)
    console.info(error)
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
              Your account could not be created, please try again
            </Alert>
          </Grid>
        </Collapse>
        <Grid item xs={12} className={classes.margin}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='username'
              inputRef={register({
                required: 'Please enter your desired username'
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
                  message: "Please enter a valid email address"
                }
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
                required: 'Please enter your password',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                  message: "Password must have a minimum of eight characters, with at least one letter and one number"
                }
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
              aria-label='Create Account'
              variant='contained'
              fullWidth
              color='primary'>
              {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Create Account'}
            </Button>
          </form>
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
