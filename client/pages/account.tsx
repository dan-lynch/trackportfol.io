import React, { useEffect, useContext, useState } from 'react'
import Router from 'next/router'
import { useQuery } from '@apollo/client'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { AppContext } from 'context/AppContext'
import {
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  Box,
  Collapse,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import Layout from 'components/Layout/LoggedInLayout'
import NotificationComponent, { Notification } from 'components/Notification'
import Modal from 'components/Modal'
import UpdateUsernameForm from 'components/Forms/UpdateUsername'
import UpdateEmailForm from 'components/Forms/UpdateEmail'
import UpdatePasswordForm from 'components/Forms/UpdatePassword'
import { graphqlService } from 'services/graphql'
import { userService } from 'services/userService'
import { AccountModalOptions } from 'helpers/types'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '1rem',
      flex: '1 0 auto',
      marginBottom: '1.5rem',
    },
    account: {
      padding: '1rem 0 0 1rem !important',
    },
    button: {
      padding: '0.25rem',
      marginBottom: '0.375rem',
      marginLeft: '0.25rem',
    },
    skeleton: {
      paddingBottom: '1rem',
    },
    collapse: {
      width: '100%',
      margin: '0px 1rem',
    },
  })
)

function Account() {
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  
  const [currentModal, setCurrentModal] = React.useState<AccountModalOptions>(AccountModalOptions.None)
  const openUsernameModal = () => setCurrentModal(AccountModalOptions.Username)
  const openEmailModal = () => setCurrentModal(AccountModalOptions.Email)
  const openPasswordModal = () => setCurrentModal(AccountModalOptions.Password)
  const closeModal = () => setCurrentModal(AccountModalOptions.None)

  const accountQueries = () => {
    const currentUser = useQuery(graphqlService.CURRENT_USER)
    const userEmail = useQuery(graphqlService.GET_USER_EMAIL)
    return [currentUser, userEmail]
  }
  const [currentUser, userEmail] = accountQueries()

  const handleUpdatedUsername = (username: string) => {
    closeModal()
    setUsername(username)
    setNotification({ show: true, message: 'Your username has been successfully updated', type: 'success' })
  }

  const handleUpdatedEmail = (email: string) => {
    closeModal()
    setEmail(email)
    setNotification({ show: true, message: 'Your email has been successfully updated', type: 'success' })
  }

  const handleUpdatedPassword = () => {
    closeModal()
    setEmail(email)
    setNotification({ show: true, message: 'Your password has been successfully updated', type: 'success' })
  }

  const logoutUser = () => {
    appContext.setIsLoggedIn(false)
    userService.logout()
    Router.push('/')
  }

  useEffect(() => {
    if (currentUser.data && !currentUser.error) {
      setUsername(currentUser.data.currentUser.username)
      appContext.setIsLoggedIn(true)
      userService.storeUserData(currentUser.data)
    } else if (currentUser.data && currentUser.error) {
      logoutUser()
    }
  }, [currentUser])

  useEffect(() => {
    if (userEmail.data?.getUserEmail?.email && !currentUser.error) {
      setEmail(userEmail.data.getUserEmail.email)
    }
  }, [userEmail])

  return (
    <Layout title='Account | trackportfol.io'>
      <Container maxWidth='sm'>
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
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {!!username ? (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>Username</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Typography>
                        {username}
                        <IconButton
                          className={classes.button}
                          size='small'
                          aria-label='Change Username'
                          onClick={openUsernameModal}>
                          <EditIcon fontSize='small' />
                        </IconButton>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Skeleton className={classes.skeleton} />
              )}
              {!!email ? (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>Email</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box>
                      <Typography>
                        {email}
                        <IconButton
                          className={classes.button}
                          size='small'
                          aria-label='Update Email'
                          onClick={openEmailModal}>
                          <EditIcon fontSize='small' />
                        </IconButton>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Skeleton className={classes.skeleton} />
              )}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>Password</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography>
                      ********
                      <IconButton
                        className={classes.button}
                        size='small'
                        aria-label='Update Password'
                        onClick={openPasswordModal}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          open={currentModal === AccountModalOptions.Username}
          onClose={closeModal}
          label='Change Username form'
          title='Change username'
          titleId='change-username'>
          <UpdateUsernameForm currentUsername={username} usernameUpdated={handleUpdatedUsername} />
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
          label='Update Password form'
          title='Update password'
          titleId='update-password'>
          <UpdatePasswordForm passwordUpdated={handleUpdatedPassword} />
        </Modal>
      </Container>
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
