import React, { useState, useContext } from 'react'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Typography, Grid, Collapse, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import NotificationComponent, { Notification } from 'components/Notification'
import { useForm } from 'react-hook-form'
import { authService } from 'services/authService'
import { gaService } from 'services/gaService'
import { AppContext } from 'context/ContextProvider'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '32rem',
      padding: '1rem 0.5rem',
    },
    paper: {
      padding: '1rem',
      flex: '1 0 auto',
      marginBottom: '1.5rem',
    },
    forgotpassword: {
      padding: '1rem 0 0 1rem !important',
    },
    loading: {
      color: 'white',
    },
    skeleton: {
      paddingBottom: '1rem',
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

function ForgotPass() {
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { emailInput } = values
    await authService.sendPasswordResetEmail(emailInput)
    setLoading(false)
    gaService.resetPasswordRequestEvent()
    setNotification({
      show: true,
      message: 'If a user exists with this email address, an email has been sent with a password reset link',
      type: 'success',
    })
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
        <Typography>
          If you have forgotten your password, please enter your email address and we will send you a password reset
          link.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='emailInput'
            inputRef={register({
              required: 'Enter your email address',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "This doesn't look quite right, please enter your email address",
              },
            })}
            name='emailInput'
            label='Email Address'
            variant='outlined'
            fullWidth
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.emailInput?.message}
            error={!!errors.emailInput}
          />
          <Button
            type='submit'
            aria-label='Send password reset email'
            fullWidth
            variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
            color='secondary'>
            {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Send password reset email'}
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const client = await initApolloClient({})
  return {
    unstable_revalidate: 300,
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(ForgotPass)
