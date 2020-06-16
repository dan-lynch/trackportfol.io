import React, { useEffect, useContext, useState } from 'react'
import Router from 'next/router'
import { useMutation } from '@apollo/client'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { AppContext } from 'context/AppContext'
import { Container, Typography, Grid, Paper, IconButton, CircularProgress, TextField, Box } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import Layout from 'components/Layout/LoggedInLayout'
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
  })
)

function Account() {
  const classes = useStyles()
  const appContext = useContext(AppContext)

  const [currentUser] = useMutation(graphqlService.CURRENT_USER)
  const [userEmail] = useMutation(graphqlService.GET_USER_EMAIL)
  const [updateUsername] = useMutation(graphqlService.UPDATE_USERNAME)
  const [updateUserEmail] = useMutation(graphqlService.UPDATE_USER_EMAIL)
  const [updateUserPassword] = useMutation(graphqlService.UPDATE_USER_PASSWORD)

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
    updateUsername({ variables: { newUsername: newUsername } }).then((response) => {
      if (response.data.updateUsername.updatedUsername.success) {
        setUsername(response.data.updateUsername.updatedUsername.updatedUsername)
      }
      setUpdateUsernameLoading(false)
      setIsEditingUsername(false)
      setNewUsername('')
    })
  }

  const toggleEditingEmail = () => setIsEditingEmail(!isEditingEmail)

  const handleUpdateEmail = () => {
    setUpdateEmailLoading(true)
    updateUserEmail({ variables: { newEmail: newEmail } }).then((response) => {
      if (response.data.updateUserEmail.updatedUserEmail.success) {
        setEmail(response.data.updateUserEmail.updatedUserEmail.updatedEmail)
      }
      setUpdateEmailLoading(false)
      setIsEditingEmail(false)
      setNewEmail('')
    })
  }

  const toggleEditingPassword = () => setIsEditingPassword(!isEditingPassword)

  const handleUpdatePassword = () => {
    setUpdatePasswordLoading(true)
    updateUserPassword({ variables: { oldPassword: oldPassword, newPassword: newPassword } }).then((response) => {
      if (response.data.updateUserPassword.updatedUserPassword.success) {
        console.info('password updated successfully')
      }
      setUpdatePasswordLoading(false)
      setIsEditingPassword(false)
      setOldPassword('')
      setNewPassword('')
    })
  }

  useEffect(() => {
    currentUser({ variables: {} }).then((response) => {
      if (response.data.currentUser.user) {
        setUsername(response.data.currentUser.user.username)
        appContext.setIsLoggedIn(true)
        userService.storeUserData(response.data)
      } else {
        appContext.setIsLoggedIn(false)
        userService.logout()
        Router.push('/')
      }
    })
    userEmail({ variables: {} }).then((response) => {
      if (response.data.getUserEmail.userEmail.email) {
        setEmail(response.data.getUserEmail.userEmail.email)
      }
    })
  }, [])

  return (
    <Layout title='Account | trackportfol.io'>
      <Container maxWidth='sm'>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.account}>
            <Typography variant='h4' component='h4' gutterBottom>
              Your account
            </Typography>
          </Grid>
          {username ? 
          <Grid item xs={12}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          : <></>}
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
