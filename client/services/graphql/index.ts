import {
  REGISTER_USER,
  CREATE_HOLDING, 
  UPDATE_HOLDING, 
  DELETE_HOLDING,
  UPDATE_THEME,
  UPDATE_USERNAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VALIDATE_USER
} from 'services/graphql/mutations'

import {
  AUTHENTICATE,
  CURRENT_USER,
  ALL_INSTRUMENTS,
  SEARCH_INSTRUMENTS,
  GET_USER_EMAIL
} from 'services/graphql/queries'

import {
  SUBSCRIBE_CURRENT_USER
} from 'services/graphql/subscriptions'

export const graphqlService = {
  REGISTER_USER,
  CREATE_HOLDING, 
  UPDATE_HOLDING, 
  DELETE_HOLDING,
  UPDATE_THEME,
  UPDATE_USERNAME,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  AUTHENTICATE,
  CURRENT_USER,
  ALL_INSTRUMENTS,
  SEARCH_INSTRUMENTS,
  GET_USER_EMAIL,
  SUBSCRIBE_CURRENT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VALIDATE_USER
};
