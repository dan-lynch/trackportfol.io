import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import BrightnessIcon from '@material-ui/icons/Brightness4'
import { AppContext } from 'context/AppContext'
import { userService } from 'services/userService'
import { graphqlService } from 'services/graphql'
import { gaService } from 'services/gaService'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  menu: {
    width: 250,
  },
  brightness: {
    width: '100%',
  },
}))

export default function LoggedInHeader() {
  const router = useRouter()
  const classes = useStyles()
  const appContext = useContext(AppContext)
  const [updateTheme] = useMutation(graphqlService.UPDATE_THEME)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleUpdateTheme = () => {
    const currentTheme = appContext.isDarkTheme
    updateUserTheme(!currentTheme)
    appContext.setIsDarkTheme(!currentTheme)
  }

  const updateUserTheme = (darkTheme: boolean) => {
    updateTheme({ variables: { userDarkTheme: darkTheme } }).then((response) => {
      if (response.data.updateTheme.updatedTheme.success) {
        gaService.themeUpdateSuccessEvent()
      } else {
        gaService.themeUpdateFailedEvent()
      }
    })
  }

  const logout = () => {
    userService.logout()
    appContext.setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          trackportfol.io
        </Typography>
        <Button onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className={classes.menuButton} />
          <Typography variant='srOnly'>Menu</Typography>
        </Button>
        <Drawer anchor='right' open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div
            className={classes.menu}
            role='presentation'
            onClick={() => setIsMenuOpen(false)}
            onKeyDown={() => setIsMenuOpen(false)}>
            <List>
              <ListItem button onClick={() => router.push('/dashboard')} key='dashboard'>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText color='inherit' primary='Dashboard' />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={logout} key='logout'>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
            <ToggleButton
              value='check'
              selected={appContext.isDarkTheme}
              className={classes.brightness}
              onChange={handleUpdateTheme}>
              <BrightnessIcon />
            </ToggleButton>
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}
