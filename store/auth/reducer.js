import { initialState } from './selectors';

import {
  INIT_VALUES_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './actions';

export default function (state = initialState, action = {}) {
  let isConfirmed = false;
  if (action.payload && action.payload.errors) {
    isConfirmed = action.payload.errors.filter(error => error.code === 613).length !== 0;
  }

  switch (action.type) {
    case INIT_VALUES_SUCCESS:
      if (action.payload && Array.isArray(action.payload)) {
        action.payload.forEach(stateName => {
          if (initialState[stateName] !== undefined) {
            state[stateName] = initialState[stateName];
            state[stateName] = initialState[stateName];
          }
        });
      }
      return {
        ...state,
      };
    // Login
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginStatus: 'running',
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginStatus: 'success',
        user: action.payload.user,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginStatus: 'failure',
        loginErrors: action.payload.errors,
        user: action.payload.user,
      };
    // Logout
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutStatus: 'running',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        logoutStatus: 'success',
        loginStatus: 'failure',
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        logoutStatus: 'failure',
        logoutErrors: action.payload.errors,
      };
    default:
      return state;
  }
}
