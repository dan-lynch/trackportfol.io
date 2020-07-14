import React, { useEffect } from 'react'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Container, Typography, Box } from '@material-ui/core'
import Layout from 'components/Layout/LoggedOutLayout'
import Modal from 'components/Modal'
import LoginForm from 'components/Forms/Login'
import SignUpForm from 'components/Forms/SignUp'
import ForgotPassForm from 'components/Forms/ForgotPass'
import Cookie from 'js-cookie'
import { TOKEN } from 'helpers/constants'
import { ModalOptions } from 'helpers/types'

function Home() {

  const [currentModal, setCurrentModal] = React.useState<ModalOptions>(ModalOptions.None)
  const openLoginModal = () => setCurrentModal(ModalOptions.Login)
  const openSignupModal = () => setCurrentModal(ModalOptions.SignUp)
  const openForgotPassModal = () => setCurrentModal(ModalOptions.ForgotPass)
  const closeModal = () => setCurrentModal(ModalOptions.None)

  useEffect(() => {
    if (Cookie.getJSON(TOKEN)) {
      window.location.replace('/dashboard')
    }
  }, [])

  return (
    <Layout title='Home | trackportfol.io' openLogin={openLoginModal} openJoin={openSignupModal}>
      <Container maxWidth='sm'>
        <Box my={4}>
          <Typography variant='h4' component='h1' gutterBottom>
            Easily track your portfolio.
          </Typography>
        </Box>
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
