import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LoggedOutHeader from 'components/Header/LoggedOutHeader'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '1rem',
    justifyContent: 'center',
  },
}))

type Props = {
  children?: any
  title?: string
  handleOpenLogin: () => any
  handleOpenJoin: () => any
}

export default function Layout(props: Props) {
  const { children, handleOpenLogin, handleOpenJoin } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <LoggedOutHeader handleOpenLogin={handleOpenLogin} handleOpenJoin={handleOpenJoin} />
      <Container maxWidth='xl' className={classes.root}>
        {children}
      </Container>
    </React.Fragment>
  )
}
