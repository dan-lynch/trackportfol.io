import { USER } from 'helpers/constants';
import { BehaviorSubject } from 'rxjs';

export type User = {
  authToken: string;
}

const currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem(USER)!));

export const userService = {
  login,
  logout,
  get loggedInUser(): User {
    return currentUser.value
  }
};

async function login(token: string) {
  const user: User = {authToken: token};
  localStorage.setItem(USER, JSON.stringify(user));
  currentUser.next(user);
  return user;
}

function logout() {
  localStorage.removeItem(USER);
  currentUser.next(null);
}
