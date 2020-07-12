import React, { useEffect, useContext } from 'react'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Container, Typography, Box, Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Layout from 'components/Layout/LoggedOutLayout'
import Login from 'components/Login'
import Join from 'components/Join'
import ForgotPass from 'components/ForgotPass'
import Cookie from 'js-cookie'
import { TOKEN } from 'helpers/constants'
import { ModalOptions } from 'helpers/types'
import { AppContext } from 'context/AppContext'

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
  const appContext = useContext(AppContext)

  const [currentModal, setCurrentModal] = React.useState<ModalOptions>(ModalOptions.None)

  const openLoginModal = () => setCurrentModal(ModalOptions.Login)
  const openJoinModal = () => setCurrentModal(ModalOptions.Join)
  const openForgotPassModal = () => setCurrentModal(ModalOptions.ForgotPass)
  const closeModal = () => setCurrentModal(ModalOptions.None)

  useEffect(() => {
    if (Cookie.getJSON(TOKEN)) {
      window.location.replace('/dashboard')
    }
  }, [])

  useEffect(() => {
    if (appContext.resetPassSuccess) {
      openLoginModal()
    }
  }, [])  

  return (
    <Layout title='Home | trackportfol.io' openLogin={openLoginModal} openJoin={openJoinModal}>
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
          open={currentModal === ModalOptions.Login}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={currentModal === ModalOptions.Login} disableStrictModeCompat={true}>
            <Login openJoin={openJoinModal} openForgotPass={openForgotPassModal} />
          </Fade>
        </Modal>
        <Modal
          aria-labelledby='Sign up modal'
          aria-describedby='Sign up to trackportfol.io'
          className={classes.modal}
          disablePortal
          open={currentModal === ModalOptions.Join}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={currentModal === ModalOptions.Join} disableStrictModeCompat={true}>
            <Join openLogin={openLoginModal} />
          </Fade>
        </Modal>
        <Modal
          aria-labelledby='Forgot password modal'
          aria-describedby='Forgot password for trackportfol.io'
          className={classes.modal}
          disablePortal
          open={currentModal === ModalOptions.ForgotPass}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={currentModal === ModalOptions.ForgotPass} disableStrictModeCompat={true}>
            <ForgotPass />
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
