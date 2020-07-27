import firebase from "firebase/app";
import "firebase/auth";
import { TOKEN } from 'helpers/constants'
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
  measurementId: 'G-VQZFXPE6CC'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const authService = {
  signin,
  signup,
  signout,
  sendPasswordResetEmail,
  confirmPasswordReset,
  storeGraphqlToken,
  removeGraphqlToken,
  get graphqltoken(): string | null {
    return !!currentGraphqlToken ? currentGraphqlToken : null
  }
}

async function signin(email: string, password: string) {
  try {
    const {user} = await auth.signInWithEmailAndPassword(email, password);
    console.log(JSON.stringify(user));
    return user;
  }
  catch(error){
    console.log('Error: authService | signin(email, password)');
    return false;
  }
}

async function signup(email: string, password: string) {
  try {
    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    console.log(JSON.stringify(user));
    return user;
  }
  catch(error){
    console.log('Error: authService | signup(email, password)');
    return false;
  }
}

async function signout() {
  try {
    await auth.signOut()
    return true;
  }
  catch(error){
    console.log('Error: authService | signout()');
    return false;
  }
}


async function sendPasswordResetEmail (email: string) {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  }
  catch(error){
    console.log('Error: authService | sendPasswordResetEmail()');
    return false;
  }
}

async function confirmPasswordReset (code: string, password: string) {
  try {
    await auth.confirmPasswordReset(code, password);
    return true;
  }
  catch(error){
    console.log('Error: authService | sendPasswordResetEmail()');
    return false;
  }
}

function storeGraphqlToken(jwtToken: string) {
  Cookie.set(TOKEN, jwtToken)
}

function removeGraphqlToken() {
  Cookie.remove(TOKEN)
}