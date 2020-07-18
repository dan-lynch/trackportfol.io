import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Typography, Grid, Collapse, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { useForm } from 'react-hook-form'
import { gaService } from 'services/gaService'
import { AppContext } from 'context/AppContext'

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
    currentUsername: string
    usernameUpdated: any
  }

export default function UpdateUsername(props: Props) {
  const { currentUsername, usernameUpdated } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [updateUsernameMutation] = useMutation(graphqlService.UPDATE_USERNAME)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { username } = values
    updateUsernameMutation({ variables: { newUsername: username } })
      .then((response) => {
        if (response.data.updateUsername.updatedUsername.success) {
          setLoading(false)
          gaService.usernameUpdatedSuccessEvent()
          usernameUpdated(response.data.updateUsername.updatedUsername.updatedUsername)
        } else {
          updateUsernameFailed()
        }
      })
      .catch(() => {
        updateUsernameFailed()
      })
  }

  const updateUsernameFailed = () => {
    setLoading(false)
    gaService.usernameUpdatedFailedEvent()
    setNotification({
      show: true,
      message: 'Could not update username (may already be taken), please choose another username or try again later',
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
        <Typography>
          To change your username, enter your desired new username below and click submit.
        </Typography>
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
            label='New Username'
            variant='outlined'
            fullWidth
            placeholder={currentUsername}
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.username?.message}
            error={!!errors.username}
          />
          <Button
            type='submit'
            aria-label='Update username'
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