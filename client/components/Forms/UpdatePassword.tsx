import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { Typography, Grid, Collapse, TextField, Button, CircularProgress, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
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
    passwordUpdated: any
  }

export default function UpdatePassword(props: Props) {
  const { passwordUpdated } = props
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [updatePasswordMutation] = useMutation(graphqlService.UPDATE_USER_PASSWORD)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { oldPassword, newPassword } = values
    updatePasswordMutation({ variables: { oldPassword: oldPassword, newPassword: newPassword } })
      .then((response) => {
        if (response.data.updateUserPassword.updatedUserPassword.success) {
        setLoading(false)
        gaService.passwordUpdatedSuccessEvent()
        passwordUpdated()
      } else {
        updatePasswordFailed()
      }
      })
      .catch(() => {
        updatePasswordFailed()
      })
  }

  const updatePasswordFailed = () => {
    setLoading(false)
    gaService.passwordUpdatedFailedEvent()
    setNotification({
      show: true,
      message: 'Could not change password, please refresh the page or try again later',
      type: 'error',
    })
  }

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword)
  }
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
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
        <Typography>
          To update your password, please enter your new password along with your current password below and click submit. 
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
            id='oldPassword'
            inputRef={register({
              required: 'Please enter your old password',
            })}
            name='oldPassword'
            label='Current Password'
            type={showOldPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            autoComplete='off'
            helperText={errors.oldPassword?.message}
            error={!!errors.oldPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
                    <TextField
            id='newPassword'
            inputRef={register({
              required: 'Please enter your desired password',
              pattern: {
                value: /^.{6,}$/i,
                message: 'Password must be at least six characters long',
              },
            })}
            name='newPassword'
            label='New Password'
            type={showNewPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            autoComplete='off'
            helperText={errors.newPassword?.message}
            error={!!errors.newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            aria-label='Update password'
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