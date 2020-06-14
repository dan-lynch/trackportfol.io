import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
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
  menu: {
    width: 250,
  },
}))

type Props = {
  handleOpenLogin: () => any
  handleOpenJoin: () => any
}

export default function LoggedOutHeader(props: Props) {
  const { handleOpenLogin, handleOpenJoin } = props

  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            trackportfol.io
          </Typography>
          <Button color='inherit' onClick={handleOpenLogin}>
            Sign in
          </Button>
          <Button color='inherit' onClick={handleOpenJoin}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
