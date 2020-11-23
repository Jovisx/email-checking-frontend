import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as api from 'utils/api';
import extractErrors from 'utils/error';

import {
  ASSIGN_EMAIL_REQUEST,
  PROCESS_EMAIL_REQUEST,
  emailActions,
} from './actions';

export function* assignEmail() {
  try {
    const response = yield call(api.assignEmail, {});
    yield put(emailActions.assignEmailSuccess(response.data.data));
  } catch (err) {
    const errors = extractErrors(err);
    yield put(emailActions.assignEmailFailure({ errors }));
  }
}

export function* processEmail({ payload }) {
  try {
    const response = yield call(api.processEmail, payload);
    yield put(emailActions.processEmailSuccess(response.data.data));
  } catch (err) {
    const errors = extractErrors(err);
    yield put(emailActions.processEmailFailure({ errors }));
  }
}

export default function* () {
  yield all([
    takeLatest(ASSIGN_EMAIL_REQUEST, assignEmail),
    takeLatest(PROCESS_EMAIL_REQUEST, processEmail)
  ]);
}
