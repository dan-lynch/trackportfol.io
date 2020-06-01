import { BehaviorSubject } from 'rxjs';
import ReactGA from 'react-ga';
import { USER, TOKEN } from 'helpers/constants';



export type User = {
  userId: number;
  firstName: string;
  lastName: string;
};

export type Token = {
  authToken: string;
};

const currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem(USER)!));

const currentToken = new BehaviorSubject(JSON.parse(localStorage.getItem(TOKEN)!));

export const userService = {
  login,
  logout,
  storeUserData,
  get loggedInUser(): User {
    return currentUser.value;
  },
  get token(): Token {
    return currentToken.value;
  },
  get isLoggedIn(): boolean {
    return !!currentToken.value;
  },
};

async function login(data: any) {
  if (data.jwtToken) {
    const token: Token = { authToken: data.jwtToken };
    localStorage.setItem(TOKEN, JSON.stringify(token));
    currentToken.next(token);
    return token;
  } else {
    return null;
  }
}

async function storeUserData(data: any) {
  const { id, firstName, lastName } = data.currentUser;
  if (id) {
    const user: User = { userId: id, firstName, lastName };
    localStorage.setItem(USER, JSON.stringify(user));
    ReactGA.set({ userId: id });
    currentUser.next(user);
    return user;
  } else {
    return null;
  }
}


function logout() {
  localStorage.removeItem(USER);
  localStorage.removeItem(TOKEN);
  currentUser.next(null);
  currentToken.next(null);
  return true;
}
