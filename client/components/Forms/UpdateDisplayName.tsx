import React, { useState, useContext } from 'react'
import { Typography, Grid, Collapse, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import NotificationComponent, { Notification } from 'components/Notification'
import { useForm } from 'react-hook-form'
import { authService } from 'services/authService'
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
  currentDisplayName: string
  displayNameUpdated: any
}

export default function UpdateDisplayName(props: Props) {
  const { currentDisplayName, displayNameUpdated } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { displayName } = values
    const updateEmailResult = await authService.updateDisplayName(displayName)
    if (updateEmailResult) {
      setLoading(false)
      gaService.usernameUpdatedSuccessEvent()
      displayNameUpdated(displayName)
    } else {
      updateDisplayNameFailed()
    }
  }

  const updateDisplayNameFailed = () => {
    setLoading(false)
    gaService.usernameUpdatedFailedEvent()
    setNotification({
      show: true,
      message: 'Could not update display name, please try again later',
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
        <Typography>To change your display name, enter your new display name below and click submit.</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='displayName'
            inputRef={register({
              required: 'Please enter your desired display name',
              pattern: {
                value: /^[A-Z0-9.]{3,}$/i,
                message:
                  'Displayn name must be at least three characters long, containing only letters (a-z), numbers (0-9), and periods (.)',
              },
            })}
            name='displayName'
            label='Display Name'
            variant='outlined'
            fullWidth
            placeholder={currentDisplayName}
            autoComplete='on'
            autoCapitalize='off'
            helperText={errors.displayName?.message}
            error={!!errors.displayName}
          />
          <Button
            type='submit'
            aria-label='Change display name'
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
