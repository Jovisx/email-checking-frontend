import { createAction } from 'redux-actions';

export const INIT_VALUES = '@auth/INIT_VALUES';
export const INIT_VALUES_SUCCESS = '@auth/INIT_VALUES_SUCCESS';

export const LOGIN_USER_REQUEST = '@auth/LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = '@auth/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = '@auth/LOGIN_USER_FAILURE';
export const LOGOUT_REQUEST = '@auth/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = '@auth/LOGOUT_FAILURE';

export const authActions = {
  // Init State
  initValues: createAction(INIT_VALUES),
  initValuesSuccess: createAction(INIT_VALUES_SUCCESS),
  // Login
  loginUserRequest: createAction(LOGIN_USER_REQUEST),
  loginUserSuccess: createAction(LOGIN_USER_SUCCESS),
  loginUserFailure: createAction(LOGIN_USER_FAILURE),
  // Logout
  logoutRequest: createAction(LOGOUT_REQUEST),
  logoutSuccess: createAction(LOGOUT_SUCCESS),
  logoutFailure: createAction(LOGOUT_FAILURE),
};
