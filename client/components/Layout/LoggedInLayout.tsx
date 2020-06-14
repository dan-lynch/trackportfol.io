import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LoggedInHeader from 'components/Header/LoggedInHeader'

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
}

export default function Layout(props: Props) {
  const { children } = props
  const classes = useStyles()

  return (
    <React.Fragment>
      <LoggedInHeader />
      <Container maxWidth='xl' className={classes.root}>
        {children}
      </Container>
    </React.Fragment>
  )
}
