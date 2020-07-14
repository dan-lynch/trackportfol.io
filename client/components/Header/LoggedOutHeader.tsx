import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '9rem',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '9rem',
    },
    marginTop: '0.4rem',
  },
  signup: {
    lineHeight: 'initial',
  }
}))

type Props = {
  openLogin: () => any
  openJoin: () => any
}

export default function LoggedOutHeader(props: Props) {
  const { openLogin, openJoin } = props

  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar>
          <div className={classes.title}>
            <img className={classes.logo} src='/logo.svg' alt='trackportfol.io logo'></img>
          </div>
          <Button color='inherit' onClick={openLogin}>
            Login
          </Button>
          <Button className={classes.signup} variant='outlined' color='inherit' onClick={openJoin}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
