import { createAction } from 'redux-actions';

export const ASSIGN_EMAIL_REQUEST = '@email/ASSIGN_EMAIL_REQUEST';
export const ASSIGN_EMAIL_SUCCESS = '@email/ASSIGN_EMAIL_SUCCESS';
export const ASSIGN_EMAIL_FAILURE = '@email/ASSIGN_EMAIL_FAILURE';
export const PROCESS_EMAIL_REQUEST = '@emails/PROCESS_EMAIL_REQUEST';
export const PROCESS_EMAIL_SUCCESS = '@emails/PROCESS_EMAIL_SUCCESS';
export const PROCESS_EMAIL_FAILURE = '@emails/PROCESS_EMAIL_FAILURE';

export const emailActions = {
  // Get Emails
  assignEmailRequest: createAction(ASSIGN_EMAIL_REQUEST),
  assignEmailSuccess: createAction(ASSIGN_EMAIL_SUCCESS),
  assignEmailFailure: createAction(ASSIGN_EMAIL_FAILURE),
  processEmailRequest: createAction(PROCESS_EMAIL_REQUEST),
  processEmailSuccess: createAction(PROCESS_EMAIL_SUCCESS),
  processEmailFailure: createAction(PROCESS_EMAIL_FAILURE)
};
