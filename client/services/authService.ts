import firebase from 'firebase/app'
import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import Cookie from 'js-cookie'
import Router from 'next/router'
import 'firebase/auth'
import {
  TOKEN,
  USER,
  AUTH_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from 'helpers/constants'

export type Token = {
  authToken: string
}

const userCookie = new BehaviorSubject<firebase.User | null>(Cookie.getJSON(USER)!)

const token = new BehaviorSubject<Token | null>(Cookie.getJSON(TOKEN)!)

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_MESSAGING_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()

export const authService = {
  refreshUser,
  signin,
  signup,
  signout,
  updateEmail,
  updatePassword,
  updateDisplayName,
  sendPasswordResetEmail,
  confirmPasswordReset,
  storeGraphqlToken,
  removeGraphqlToken,
  validateUser,
  get currentToken(): string | null {
    return token.value ? token.value.authToken : null
  },
  get currentUser(): firebase.User | null {
    return firebase.auth().currentUser
  },
}

async function refreshUser() {
  try {
    await firebase.auth().currentUser?.reload()
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser
    } else if (userCookie.value) {
      await firebase.auth().updateCurrentUser(userCookie.value)
      return firebase.auth().currentUser
    } else {
      return null
    }
  } catch (error) {
    // console.log('Error: authService | refreshUser() - Error: ' + error)
    return null
  }
}

async function signin(email: string, password: string) {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    if (user) {
      await auth.updateCurrentUser(user)
      storeUserCookie(user)
      const token = await user.getIdToken()
      const isValidUser = await authService.validateUser(token)
      return isValidUser
    } else {
      return false
    }
  } catch (error) {
    // console.log('Error: authService | signin(email, password) - Error: ' + error)
    return false
  }
}

async function signup(email: string, password: string, displayName: string) {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    if (user) {
      await user.updateProfile({ displayName })
      await auth.updateCurrentUser(user)
      await user.sendEmailVerification()
      storeUserCookie(user)
      const token = await user.getIdToken()
      const isValidUser = await validateUser(token)
      return isValidUser
    } else {
      return false
    }
  } catch (error) {
    // console.log('Error: authService | signup(email, password) - Error: ' + error)
    return false
  }
}

async function signout() {
  try {
    await auth.signOut()
    removeGraphqlToken()
    removeUserCookie()
    Router.push('/')
    return true
  } catch (error) {
    // console.log('Error: authService | signout() - Error: ' + error)
    return false
  }
}

async function validateUser(firebaseToken: string) {
  try {
    const url = AUTH_URL + '?token=' + firebaseToken
    const { data } = await axios.get(url)
    storeGraphqlToken(data.data.validateUser.userValidated.token)
    return true
  } catch (error) {
    // console.log('Error: authService | validateUser() - Error: ' + error)
    return false
  }
}

async function sendPasswordResetEmail(email: string) {
  try {
    await auth.sendPasswordResetEmail(email)
    return true
  } catch (error) {
    return true // don't expose to user if email was valid (security)
  }
}

async function confirmPasswordReset(code: string, password: string) {
  try {
    await auth.confirmPasswordReset(code, password)
    return true
  } catch (error) {
    // console.log('Error: authService | sendPasswordResetEmail() - Error: ' + error)
    return false
  }
}

async function updateEmail(password: string, email: string) {
  try {
    const originalEmail = firebase.auth().currentUser?.email
    if (originalEmail) {
      const { user } = await auth.signInWithEmailAndPassword(originalEmail, password)
      if (user) {
        await user.updateEmail(email)
        const updatedUser = firebase.auth().currentUser
        if (updatedUser) {
          storeUserCookie(updatedUser)
        }
        return true
      } else {
        // console.log('Error: authService | updateEmail() - Error: No user found')
        return false
      }
    }
  } catch (error) {
    // console.log('Error: authService | updateEmail() - Error: ' + error)
    return false
  }
}

async function updatePassword(password: string) {
  try {
    const user = firebase.auth().currentUser
    if (user) {
      await user.updatePassword(password)
      const updatedUser = firebase.auth().currentUser
      if (updatedUser) {
        storeUserCookie(updatedUser)
      }
      return true
    } else {
      // console.log('Error: authService | updatePassword() - Error: No user found')
      return false
    }
  } catch (error) {
    // console.log('Error: authService | updatePassword() - Error: ' + error)
    return false
  }
}

async function updateDisplayName(displayName: string) {
  try {
    const user = firebase.auth().currentUser
    if (user) {
      await user.updateProfile({ displayName })
      const updatedUser = firebase.auth().currentUser
      if (updatedUser) {
        storeUserCookie(updatedUser)
      }
      return true
    } else {
      // console.log('Error: authService | updateDisplayName() - Error: No user found')
      return false
    }
  } catch (error) {
    // console.log('Error: authService | updateDisplayName() - Error: ' + error)
    return false
  }
}

function storeGraphqlToken(jwtToken: string) {
  const tokenObj: Token = { authToken: jwtToken }
  Cookie.set(TOKEN, tokenObj)
  token.next(tokenObj)
}

function removeGraphqlToken() {
  Cookie.remove(TOKEN)
  token.next(null)
}

function storeUserCookie(user: firebase.User) {
  Cookie.set(USER, user)
  userCookie.next(user)
}

function removeUserCookie() {
  Cookie.remove(USER)
  userCookie.next(null)
}
