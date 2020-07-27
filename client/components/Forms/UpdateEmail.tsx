import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Typography, Grid, Collapse, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { useForm } from 'react-hook-form'
import { gaService } from 'services/gaService'
import { AppContext } from 'context/ContextProvider'

const useStyles = makeStyles((theme) =>
  createStyles({
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
  currentEmail: string
  emailUpdated: any
}

export default function UpdateEmail(props: Props) {
  const { currentEmail, emailUpdated } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [updateEmailMutation] = useMutation(graphqlService.UPDATE_USER_EMAIL)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { email } = values
    updateEmailMutation({ variables: { newEmail: email } })
      .then((response) => {
        if (response.data.updateUserEmail.updatedUserEmail.success) {
          setLoading(false)
          gaService.emailUpdatedSuccessEvent()
          emailUpdated(response.data.updateUserEmail.updatedUserEmail.updatedEmail)
        } else {
          updateEmailFailed()
        }
      })
      .catch(() => {
        updateEmailFailed()
      })
  }

  const updateEmailFailed = () => {
    setLoading(false)
    gaService.emailUpdatedFailedEvent()
    setNotification({
      show: true,
      message:
        'Could not update email, please refresh the page or try again later',
      type: 'error',
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
        <Typography>To update your email, enter your new email address below and click submit.</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
            label='New Email'
            variant='outlined'
            fullWidth
            placeholder={currentEmail}
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.email?.message}
            error={!!errors.email}
          />
          <Button
            type='submit'
            aria-label='Update email'
            fullWidth
            variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
            color='secondary'>
            {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Submit'}
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  )
}
