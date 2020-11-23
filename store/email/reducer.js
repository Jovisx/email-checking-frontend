import { initialState } from './selectors';

import {
  ASSIGN_EMAIL_REQUEST,
  ASSIGN_EMAIL_SUCCESS,
  ASSIGN_EMAIL_FAILURE,
  PROCESS_EMAIL_REQUEST,
  PROCESS_EMAIL_SUCCESS,
  PROCESS_EMAIL_FAILURE
} from './actions';

export default function (state = initialState, action = {}) {
  switch (action.type) {
    // Email
    case ASSIGN_EMAIL_REQUEST:
      return {
        ...state,
        assignStatus: 'running',
      };
    case ASSIGN_EMAIL_SUCCESS: {
      return {
        ...state,
        email: action.payload,
        assignStatus: 'success',
      };
    }
    case ASSIGN_EMAIL_FAILURE:
      return {
        ...state,
        assignStatus: 'failure',
        assignErrors: action.payload.errors,
      };
    case PROCESS_EMAIL_REQUEST:
      return {
        ...state,
        processStatus: 'running',
      };
    case PROCESS_EMAIL_SUCCESS: {
      return {
        ...state,
        processStatus: 'success',
      };
    }
    case PROCESS_EMAIL_FAILURE:
      return {
        ...state,
        processStatus: 'failure',
      };
    default:
      return state;
  }
}
