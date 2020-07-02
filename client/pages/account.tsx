import React, { useEffect, useContext, useState } from 'react'
import Router from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { AppContext } from 'context/AppContext'
import {
  Container,
  Typography,
  Grid,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Box,
  Collapse,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import Layout from 'components/Layout/LoggedInLayout'
import NotificationComponent, { Notification } from 'components/Notification'
import { graphqlService } from 'services/graphql'
import { userService } from 'services/userService'

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

  const accountQueries = () => {
    const currentUser = useQuery(graphqlService.CURRENT_USER)
    const userEmail = useQuery(graphqlService.GET_USER_EMAIL)
    return [currentUser, userEmail]
  }

  const [currentUser, userEmail] = accountQueries()
  const [updateUsername] = useMutation(graphqlService.UPDATE_USERNAME)
  const [updateUserEmail] = useMutation(graphqlService.UPDATE_USER_EMAIL)
  const [updateUserPassword] = useMutation(graphqlService.UPDATE_USER_PASSWORD)

  const [notification, setNotification] = useState<Notification>({ show: false })
  const [username, setUsername] = useState<string | null>(null)
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false)
  const [updateUsernameLoading, setUpdateUsernameLoading] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>('')

  const [email, setEmail] = useState<string | null>(null)
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false)
  const [updateEmailLoading, setUpdateEmailLoading] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')

  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false)
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const toggleEditingUsername = () => setIsEditingUsername(!isEditingUsername)

  const handleUpdateUsername = () => {
    setUpdateUsernameLoading(true)
    updateUsername({ variables: { newUsername: newUsername } })
      .then((response) => {
        if (response.data.updateUsername.updatedUsername.success) {
          setUsername(response.data.updateUsername.updatedUsername.updatedUsername)
          setNotification({ show: true, message: 'Your username has been successfully updated', type: 'success' })
        } else {
          setNotification({ show: true, message: 'Could not update username, please try again later', type: 'error' })
        }
        resetUsernameState()
      })
      .catch(() => {
        setNotification({ show: true, message: 'Could not update username, please try again later', type: 'error' })
        resetUsernameState()
      })
  }

  const resetUsernameState = () => {
    setUpdateUsernameLoading(false)
    setIsEditingUsername(false)
    setNewUsername('')
  }

  const toggleEditingEmail = () => setIsEditingEmail(!isEditingEmail)

  const handleUpdateEmail = () => {
    setUpdateEmailLoading(true)
    updateUserEmail({ variables: { newEmail: newEmail } })
      .then((response) => {
        if (response.data.updateUserEmail.updatedUserEmail.success) {
          setEmail(response.data.updateUserEmail.updatedUserEmail.updatedEmail)
          setNotification({ show: true, message: 'Your email has been successfully updated', type: 'success' })
        } else {
          setNotification({ show: true, message: 'Could not update email, please try again later', type: 'error' })
        }
        resetEmailState()
      })
      .catch(() => {
        setNotification({ show: true, message: 'Could not update email, please try again later', type: 'error' })
        resetEmailState()
      })
  }

  const resetEmailState = () => {
    setUpdateEmailLoading(false)
    setIsEditingEmail(false)
    setNewEmail('')
  }

  const toggleEditingPassword = () => setIsEditingPassword(!isEditingPassword)

  const handleUpdatePassword = () => {
    setUpdatePasswordLoading(true)
    updateUserPassword({ variables: { oldPassword: oldPassword, newPassword: newPassword } })
      .then((response) => {
        response.data.updateUserPassword.updatedUserPassword.success
          ? setNotification({ show: true, message: 'Your password has been successfully updated', type: 'success' })
          : setNotification({ show: true, message: 'Could not update password, please try again later', type: 'error' })
        resetPasswordState()
      })
      .catch(() => {
        setNotification({ show: true, message: 'Could not update password, please try again later', type: 'error' })
        resetPasswordState()
      })
  }

  const resetPasswordState = () => {
    setUpdatePasswordLoading(false)
    setIsEditingPassword(false)
    setOldPassword('')
    setNewPassword('')
  }

  useEffect(() => {
    if (currentUser.data && !currentUser.error) {
      setUsername(currentUser.data.currentUser.username)
      appContext.setIsLoggedIn(true)
      userService.storeUserData(currentUser.data)
    } else if (currentUser.data && currentUser.error) {
      appContext.setIsLoggedIn(false)
      userService.logout()
      Router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (userEmail.data && !currentUser.error) {
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
              {username ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>Username</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        {isEditingUsername ? (
                          <React.Fragment>
                            <TextField
                              id='update-username'
                              margin='none'
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                              placeholder={username || 'Username'}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              size='small'
                            />
                            {updateUsernameLoading ? (
                              <CircularProgress size={16} />
                            ) : (
                              <React.Fragment>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Confirm New Username'
                                  onClick={handleUpdateUsername}>
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Cancel Updating Username'
                                  onClick={() => setIsEditingUsername(false)}>
                                  <ClearIcon />
                                </IconButton>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                          <Typography>
                            {username}
                            <IconButton
                              className={classes.button}
                              size='small'
                              aria-label='Edit Username'
                              onClick={toggleEditingUsername}>
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>Email</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        {isEditingEmail ? (
                          <React.Fragment>
                            <TextField
                              id='update-email'
                              margin='none'
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              placeholder={email || 'New email'}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              size='small'
                            />
                            {updateEmailLoading ? (
                              <CircularProgress size={16} />
                            ) : (
                              <React.Fragment>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Update Email'
                                  onClick={handleUpdateEmail}>
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Cancel Updating Email'
                                  onClick={() => setIsEditingEmail(false)}>
                                  <ClearIcon />
                                </IconButton>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                          <Typography>
                            {email}
                            <IconButton
                              className={classes.button}
                              size='small'
                              aria-label='Edit Email'
                              onClick={toggleEditingEmail}>
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography>Password</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Box>
                        {isEditingPassword ? (
                          <React.Fragment>
                            <TextField
                              id='update-password-old'
                              margin='none'
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              placeholder={'Old password'}
                              type='password'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              size='small'
                            />
                            <TextField
                              id='update-password-new'
                              margin='none'
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder={'New password'}
                              type='password'
                              InputLabelProps={{
                                shrink: true,
                              }}
                              size='small'
                            />
                            {updatePasswordLoading ? (
                              <CircularProgress size={16} />
                            ) : (
                              <React.Fragment>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Update Password'
                                  onClick={handleUpdatePassword}>
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  className={classes.button}
                                  aria-label='Cancel Updating Password'
                                  onClick={() => setIsEditingPassword(false)}>
                                  <ClearIcon />
                                </IconButton>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                          <Typography>
                            ********
                            <IconButton
                              className={classes.button}
                              size='small'
                              aria-label='Edit Password'
                              onClick={toggleEditingPassword}>
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Skeleton className={classes.skeleton} />
                  <Skeleton className={classes.skeleton} />
                  <Skeleton className={classes.skeleton} />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
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
