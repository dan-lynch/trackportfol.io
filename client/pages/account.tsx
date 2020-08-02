import React, { useEffect, useContext, useState } from 'react'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { AppContext } from 'context/ContextProvider'
import { Typography, Grid, Paper, Collapse, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout/LoggedInLayout'
import NotificationComponent, { Notification } from 'components/Notification'
import Modal from 'components/Modal'
import UpdateDisplayNameForm from 'components/Forms/UpdateDisplayName'
import UpdateEmailForm from 'components/Forms/UpdateEmail'
import UpdatePasswordForm from 'components/Forms/UpdatePassword'
import { authService } from 'services/authService'
import { AccountModalOptions } from 'helpers/types'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
    },
    account: {
      padding: '1rem 0 0 1rem !important',
    },
    button: {
      padding: '0.25rem',
      marginBottom: '1rem',
    },
    skeleton: {
      paddingBottom: '1rem',
    },
    collapse: {
      width: '100%',
      margin: '0px 1rem',
    },
    subtitle: {
      paddingTop: '0.125rem',
      marginBottom: '1.25rem',
    },
  })
)

function Account() {
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [currentModal, setCurrentModal] = React.useState<AccountModalOptions>(AccountModalOptions.None)
  const openDisplayNameModal = () => setCurrentModal(AccountModalOptions.DisplayName)
  const openEmailModal = () => setCurrentModal(AccountModalOptions.Email)
  const openPasswordModal = () => setCurrentModal(AccountModalOptions.Password)
  const closeModal = () => setCurrentModal(AccountModalOptions.None)

  const handleUpdatedDisplayName = (displayName: string) => {
    closeModal()
    setDisplayName(displayName)
    setNotification({ show: true, message: 'Your display name has been successfully updated', type: 'success' })
  }

  const handleUpdatedEmail = (email: string) => {
    closeModal()
    setEmail(email)
    setNotification({
      show: true,
      message: 'Your email address has been successfully updated',
      type: 'success',
    })
  }

  const handleUpdatedPassword = () => {
    closeModal()
    setEmail(email)
    setNotification({ show: true, message: 'Your password has been successfully updated', type: 'success' })
  }

  useEffect(() => {
    async function setUser() {
      if (authService.currentUser) {
        setDisplayName(authService.currentUser.displayName || 'No display name set')
        setEmail(authService.currentUser.email || 'No email set')
      } else {
        const updatedUser = await authService.refreshUser()
        if (updatedUser) {
          setDisplayName(updatedUser.displayName || 'No display name set')
          setEmail(updatedUser.email || 'No email set')
        } else {
          authService.signout()
        }
      }
    }
    setUser()
  }, [])

  return (
    <Layout title='Account | trackportfol.io'>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.account}>
          <Typography variant='h4' component='h4' gutterBottom>
            Your account
          </Typography>
        </Grid>
        <Collapse in={notification.show} className={classes.collapse}>
          <Grid item xs={12}>
            <NotificationComponent
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ show: false, type: notification.type })}
            />
          </Grid>
        </Collapse>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            {!!displayName ? (
              <Grid container spacing={2}>
                <Grid item sm={5} xs={4}>
                  <Typography variant='subtitle2' className={classes.subtitle}>
                    Display Name
                  </Typography>
                </Grid>
                <Grid item sm={7} xs={8}>
                  <Typography>{displayName}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Skeleton className={classes.skeleton} />
            )}
            {!!email ? (
              <Grid container spacing={2}>
                <Grid item sm={5} xs={4}>
                  <Typography variant='subtitle2' className={classes.subtitle}>
                    Email
                  </Typography>
                </Grid>
                <Grid item sm={7} xs={8}>
                  <Typography>{email}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Skeleton className={classes.skeleton} />
            )}
            <Grid container spacing={2}>
              <Grid item sm={5} xs={4}>
                <Typography variant='subtitle2' className={classes.subtitle}>
                  Password
                </Typography>
              </Grid>
              <Grid item sm={7} xs={8}>
                <Typography>********</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            <Button
              aria-label='Update Display Name'
              fullWidth
              variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
              color='secondary'
              className={classes.button}
              onClick={openDisplayNameModal}>
              Change Display Name
            </Button>
            <Button
              aria-label='Update Email'
              fullWidth
              variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
              color='secondary'
              className={classes.button}
              onClick={openEmailModal}>
              Update Email
            </Button>
            <Button
              aria-label='Change password'
              fullWidth
              variant={appContext.isDarkTheme ? 'outlined' : 'contained'}
              color='secondary'
              className={classes.button}
              onClick={openPasswordModal}>
              Change password
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={currentModal === AccountModalOptions.DisplayName}
        onClose={closeModal}
        label='Change Display Name form'
        title='Change display name'
        titleId='change-displayname'>
        <UpdateDisplayNameForm currentDisplayName={displayName} displayNameUpdated={handleUpdatedDisplayName} />
      </Modal>
      <Modal
        open={currentModal === AccountModalOptions.Email}
        onClose={closeModal}
        label='Update Email form'
        title='Update email'
        titleId='update-email'>
        <UpdateEmailForm currentEmail={email} emailUpdated={handleUpdatedEmail} />
      </Modal>
      <Modal
        open={currentModal === AccountModalOptions.Password}
        onClose={closeModal}
        label='Change Password form'
        title='Change password'
        titleId='change-password'>
        <UpdatePasswordForm passwordUpdated={handleUpdatedPassword} />
      </Modal>
    </Layout>
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

export default withApollo(Account)
