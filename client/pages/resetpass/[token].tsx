import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Collapse,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Box
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout/LoggedOutLayout'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { useForm } from 'react-hook-form'
import { gaService } from 'services/gaService'
import { AppContext } from 'context/AppContext'
import { ModalOptions } from 'helpers/types'
import Modal from 'components/Modal'
import LoginForm from 'components/Forms/Login'
import SignUpForm from 'components/Forms/SignUp'
import ForgotPassForm from 'components/Forms/ForgotPass'

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: '1rem',
      flex: '1 0 auto',
      marginBottom: '1.5rem',
    },
    resetpassword: {
      padding: '1rem 0 0 1rem !important',
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

function ResetPassword() {
  const classes = useStyles()
  const router = useRouter()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [currentModal, setCurrentModal] = React.useState<ModalOptions>(ModalOptions.None)
  const openLoginModal = () => setCurrentModal(ModalOptions.Login)
  const openSignupModal = () => setCurrentModal(ModalOptions.SignUp)
  const openForgotPassModal = () => setCurrentModal(ModalOptions.ForgotPass)
  const closeModal = () => setCurrentModal(ModalOptions.None)

  const { token } = router.query

  const [resetPasswordMutation] = useMutation(graphqlService.RESET_PASSWORD)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (values: any) => {
    setLoading(true)
    setNotification({ show: false, type: notification.type })
    const { newPassword } = values
    resetPasswordMutation({ variables: { token, newPassword } })
      .then(() => {
        appContext.setResetPassSuccess(true)
        setLoading(false)
        gaService.resetPasswordSuccessEvent()
        openLoginModal()
      })
      .catch(() => {
        setLoading(false)
        gaService.resetPasswordFailedEvent()
        setNotification({
          show: true,
          message: 'Could not change password, please refresh the page or try again later',
          type: 'error',
        })
      })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <Layout title='Reset Password | trackportfol.io' openLogin={openLoginModal} openJoin={openSignupModal}>
      <Container maxWidth='md'>
        <Box my={2}>
          <Typography variant='h4' component='h4' gutterBottom>
          Reset Password
          </Typography>
          </Box>
        <Grid container spacing={3}>
          <Collapse in={notification.show} className={classes.collapse}>
            <Grid item xs={12}>
              <NotificationComponent
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ show: false, type: notification.type })}
              />
            </Grid>
          </Collapse>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography>Please set a new password for your account</Typography>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
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
                  aria-label='Change password'
                  fullWidth
                  variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
                  color='secondary'>
                  {loading ? <CircularProgress size={24} className={classes.loading} /> : 'Change password'}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          open={currentModal === ModalOptions.Login}
          onClose={closeModal}
          label='Log in form'
          title='Log in'
          titleId='log-in'>
          <LoginForm openSignupForm={openSignupModal} openForgotPassForm={openForgotPassModal} />
        </Modal>
        <Modal
          open={currentModal === ModalOptions.SignUp}
          onClose={closeModal}
          label='Create your account form'
          title='Create your account'
          titleId='create-your-account'>
          <SignUpForm openLoginForm={openLoginModal} />
        </Modal>
        <Modal
          open={currentModal === ModalOptions.ForgotPass}
          onClose={closeModal}
          label='Forgot password form'
          title='Forgot password'
          titleId='forgot-password'>
          <ForgotPassForm />
        </Modal>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const client = await initApolloClient({})
  return {
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(ResetPassword)
