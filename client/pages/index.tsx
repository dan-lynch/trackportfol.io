import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { withApollo } from 'components/withApollo'
import { initApolloClient } from 'services/apolloService'
import { Container, Typography, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import Cookie from 'js-cookie'
import Layout from 'components/Layout/LoggedOutLayout'
import Modal from 'components/Modal'
import LoginForm from 'components/Forms/Login'
import SignUpForm from 'components/Forms/SignUp'
import ForgotPassForm from 'components/Forms/ForgotPass'
import { TOKEN, USER } from 'helpers/constants'
import { ModalOptions } from 'helpers/types'

const useStyles = makeStyles(() => ({
  message: {
    margin: '1rem 0',
  },
  paper: {
    padding: '1rem',
    flex: '1 0 auto',
    marginBottom: '1.5rem',
  },
  link: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

function Home() {
  const classes = useStyles()
  const router = useRouter()

  const [currentModal, setCurrentModal] = React.useState<ModalOptions>(ModalOptions.None)
  const openLoginModal = () => setCurrentModal(ModalOptions.Login)
  const openSignupModal = () => setCurrentModal(ModalOptions.SignUp)
  const openForgotPassModal = () => setCurrentModal(ModalOptions.ForgotPass)
  const closeModal = () => setCurrentModal(ModalOptions.None)

  useEffect(() => {
    if (Cookie.getJSON(TOKEN) && Cookie.getJSON(USER)) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Layout title='Home | trackportfol.io' openLogin={openLoginModal} openJoin={openSignupModal}>
      <Container maxWidth='md'>
        <Box my={2}>
          <Typography variant='h4' component='h1' gutterBottom>
            Easily track your portfolio
          </Typography>
          <Paper className={classes.paper}>
            <Typography variant='body1'>
              <span className={classes.link} onClick={openSignupModal}>
                Sign up
              </span>{' '}
              for your <strong>free</strong> account today and begin tracking your financial portfolio!
              <br />
              <br /> We already support <strong>8,000+</strong> US stocks and ETF's, along with 100+ Crypto coins and
              all NZX (NZSX) companies.
            </Typography>
          </Paper>
          <Alert variant='outlined' severity='info' className={classes.message}>
            We're still building our platform, so expect lots of exciting changes soon!
            <br />
            <br />
            <strong>Upcoming features:</strong>
            <br />
            - Support different currencies
            <br />
            - Revamped dashboard and more stocks!
            <br />- Mobile app
          </Alert>
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
    revalidate: 300,
    props: {
      apolloStaticCache: client.cache.extract(),
    },
  }
}

export default withApollo(Home)
