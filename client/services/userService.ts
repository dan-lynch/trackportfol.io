import ReactGA from 'react-ga'
import { USER, TOKEN, THEME } from 'helpers/constants'
import Cookie from 'js-cookie'

export type User = {
  userId: number
  username: string
}

export type Token = {
  authToken: string
}

const currentUser = Cookie.getJSON(USER)

const currentToken = Cookie.getJSON(TOKEN)

const currentTheme = Cookie.getJSON(THEME)

export const userService = {
  login,
  logout,
  storeUserData,
  updateTheme,
  get loggedInUser(): User | null {
    return !!currentUser ? currentUser : null
  },
  get token(): string | null {
    return !!currentToken ? currentToken : null
  },
  get theme(): string | null {
    return !!currentTheme ? currentTheme : null
  }
}

async function login(data: any) {
  if (data.jwtToken) {
    Cookie.set(TOKEN, data.jwtToken)
    return true
  } else {
    return false
  }
}

function logout() {
  Cookie.remove(USER)
  Cookie.remove(TOKEN)
  return true
}

async function storeUserData(data: any) {
  const { id, username, darkTheme } = data.currentUser.user
  if (id) {
    const user: User = { userId: id, username }
    Cookie.set(USER, JSON.stringify(user))
    updateTheme(!!darkTheme)
    ReactGA.set({ userId: id })
    return user
  } else {
    return null
  }
}

function updateTheme(isDarkTheme: boolean) {
  Cookie.remove(THEME)
  Cookie.set(THEME, isDarkTheme ? 'dark' : 'light')
}