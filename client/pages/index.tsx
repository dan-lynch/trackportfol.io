import React, { useEffect } from 'react'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Container, Typography, Box, Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout/LoggedOutLayout'
import Login from 'components/Login'
import Join from 'components/Join'
import Cookie from 'js-cookie'
import { TOKEN } from 'helpers/constants'

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)

function Home() {
  const classes = useStyles()

  const [loginModalOpen, setLoginModalOpen] = React.useState<boolean>(false)
  const [joinModalOpen, setJoinModalOpen] = React.useState<boolean>(false)

  const handleOpenLoginModal = () => setLoginModalOpen(true)
  const handleCloseLoginModal = () => setLoginModalOpen(false)
  const handleOpenJoinModal = () => setJoinModalOpen(true)
  const handleCloseJoinModal = () => setJoinModalOpen(false)

  const switchToJoin = () => {
    setLoginModalOpen(false)
    setJoinModalOpen(true)
  }

  const switchToLogin = () => {
    setJoinModalOpen(false)
    setLoginModalOpen(true)
  }

  useEffect(() => {
    if (Cookie.getJSON(TOKEN)) {
      window.location.replace('/dashboard')
    }
  }, [])

  return (
    <Layout title='Home | trackportfol.io' handleOpenLogin={handleOpenLoginModal} handleOpenJoin={handleOpenJoinModal}>
      <Container maxWidth='sm'>
        <Box my={4}>
          <Typography variant='h4' component='h1' gutterBottom>
            Easily track your portfolio.
          </Typography>
        </Box>
        <Modal
          aria-labelledby='Sign in modal'
          aria-describedby='Sign in to trackportfol.io'
          className={classes.modal}
          disablePortal
          open={loginModalOpen}
          onClose={handleCloseLoginModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={loginModalOpen} disableStrictModeCompat={true}>
            <Login switchToJoin={switchToJoin} />
          </Fade>
        </Modal>
        <Modal
          aria-labelledby='Sign up modal'
          aria-describedby='Sign up to trackportfol.io'
          className={classes.modal}
          disablePortal
          open={joinModalOpen}
          onClose={handleCloseJoinModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={joinModalOpen} disableStrictModeCompat={true}>
            <Join switchToLogin={switchToLogin} />
          </Fade>
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

export default withApollo(Home)
