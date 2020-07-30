import firebase from 'firebase/app'
import axios from 'axios'
import 'firebase/auth'
import { TOKEN, AUTH_URL } from 'helpers/constants'
import Cookie from 'js-cookie'

export type Token = {
  authToken: string
}
const currentGraphqlToken = Cookie.getJSON(TOKEN)

const firebaseConfig = {
  apiKey: 'AIzaSyBT51vdcixu6f-DAWXOSULymqiiP7cIBVk',
  authDomain: 'trackportfolio-1.firebaseapp.com',
  databaseURL: 'https://trackportfolio-1.firebaseio.com',
  projectId: 'trackportfolio-1',
  storageBucket: 'trackportfolio-1.appspot.com',
  messagingSenderId: '934663939041',
  appId: '1:934663939041:web:70e604c151ee45d19428a0',
  measurementId: 'G-VQZFXPE6CC',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth()

export const authService = {
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
  get graphqltoken(): string | null {
    return !!currentGraphqlToken ? currentGraphqlToken : null
  },
}

async function signin(email: string, password: string) {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    console.log(JSON.stringify(user))
    return user
  } catch (error) {
    console.log('Error: authService | signin(email, password)')
    return false
  }
}

async function signup(email: string, password: string) {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    console.log(JSON.stringify(user))
    return user
  } catch (error) {
    console.log('Error: authService | signup(email, password)')
    return false
  }
}

async function signout() {
  try {
    await auth.signOut()
    return true
  } catch (error) {
    console.log('Error: authService | signout()')
    return false
  }
}

async function sendPasswordResetEmail(email: string) {
  try {
    await auth.sendPasswordResetEmail(email)
    return true
  } catch (error) {
    return true // don't expose to user if email was valid (security reason)
  }
}

async function confirmPasswordReset(code: string, password: string) {
  try {
    await auth.confirmPasswordReset(code, password)
    return true
  } catch (error) {
    console.log('Error: authService | sendPasswordResetEmail()')
    return false
  }
}

async function updateEmail(user: firebase.User, email: string) {
  try {
    await user.updateEmail(email)
    return true
  } catch (error) {
    console.log('Error: authService | updateEmail()')
    return false
  }
}

async function updatePassword(user: firebase.User, password: string) {
  try {
    await user.updatePassword(password)
    return true
  } catch (error) {
    console.log('Error: authService | updatePassword()')
    return false
  }
}

async function updateDisplayName(user: firebase.User, displayName: string) {
  try {
    await user.updateProfile({displayName})
    return true
  } catch (error) {
    console.log('Error: authService | updateDisplayName()')
    return false
  }
}

function storeGraphqlToken(jwtToken: string) {
  Cookie.set(TOKEN, jwtToken)
}

function removeGraphqlToken() {
  Cookie.remove(TOKEN)
}

async function validateUser(firebaseToken: string) {
  try {
    const url = AUTH_URL + '?token=' + firebaseToken
    const data = await axios.get(url)
    return data
  } catch {
    return null
  }
}
