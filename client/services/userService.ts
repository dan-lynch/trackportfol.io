import ReactGA from 'react-ga';
import { USER, TOKEN } from 'helpers/constants';
import Cookie from 'js-cookie';

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
};

export type Token = {
  authToken: string;
};

const currentUser = Cookie.getJSON(USER);

const currentToken = Cookie.getJSON(TOKEN);

export const userService = {
  login,
  logout,
  storeUserData,
  get loggedInUser(): User | null {
    return currentUser ? currentUser : null;
  },
  get token(): string | null {
    return currentToken ? currentToken : null;
  },
  get isLoggedIn(): boolean {
    return !!currentToken;
  },
};

async function login(data: any) {
  if (data.jwtToken) {
    Cookie.set(TOKEN, data.jwtToken);
    return true;
  } else {
    return false;
  }
}

async function storeUserData(data: any) {
  const { id, firstName, lastName } = data.currentUser;
  if (id) {
    const user: User = { userId: id, firstName, lastName };
    Cookie.set(USER, JSON.stringify(user));
    ReactGA.set({ userId: id });
    return user;
  } else {
    return null;
  }
}


function logout() {
  Cookie.remove(USER);
  Cookie.remove(TOKEN);
  return true;
}
