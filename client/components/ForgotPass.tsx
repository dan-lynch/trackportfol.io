import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Typography, Grid, Paper, Collapse, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { useForm } from 'react-hook-form'
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
    paper: {
      padding: '1rem',
      flex: '1 0 auto',
      marginBottom: '1.5rem',
    },
    forgotpassword: {
      padding: '1rem 0 0 1rem !important',
    },
    button: {
      padding: '0.25rem',
      marginBottom: '0.375rem',
      marginLeft: '0.25rem',
    },
    loading: {
      color: 'white',
    },
    skeleton: {
      paddingBottom: '1rem',
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

function ForgotPass() {
  const classes = useStyles()

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [loading, setLoading] = useState<boolean>(false)

  const [forgotPasswordMutation] = useMutation(graphqlService.FORGOT_PASSWORD)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { emailInput } = values
    forgotPasswordMutation({ variables: { emailInput } })
      .then(() => {
        setLoading(false)
        gaService.resetPasswordRequestEvent()
        setNotification({
          show: true,
          message: 'If a user exists with this email address, an email has been sent with a password reset link',
          type: 'success',
        })
      })
      .catch(() => {
        setLoading(false)
        gaService.resetPasswordRequestEvent()
        setNotification({
          show: true,
          message: 'If a user exists with this email address, an email has been sent with a password reset link',
          type: 'success',
        })
      })
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.margin}>
          <Typography variant='h5'>Forgot password</Typography>
        </Grid>
        <Collapse in={notification.show} className={classes.collapse}>
          <Grid item xs={12} className={classes.margin}>
            <NotificationComponent
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ show: false, type: notification.type })}
            />
          </Grid>
        </Collapse>
        <Grid item xs={12} className={classes.margin}>
          <Typography>
            If you have forgotten your password, please enter your email address and we will send you a password reset link.
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='emailInput'
              inputRef={register({
                required: 'Enter your email address',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "This doesn't look quite right. Please enter your email address.",
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
              className={classes.button}
              aria-label='Send password reset email'
              variant='contained'
              fullWidth
              color='primary'>
              {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Send password reset email'}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
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
