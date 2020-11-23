import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Router, i18n } from 'i18n';
import * as api from 'utils/api';
import extractErrors from 'utils/error';
import toast from 'components/toastify/toast';

import {
  INIT_VALUES,
  LOGIN_USER_REQUEST,
  LOGOUT_REQUEST,
  authActions,
} from './actions';

const tokenName = "accessToken";

export function* initValues({ payload }) {
  yield put(authActions.initValuesSuccess(payload));
}

export function* loginUser({ payload }) {
  try {
    const response = yield call(api.loginUser, payload);
    const user = response.data.data;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(tokenName, user.accessToken);
    }
    Router.push(`/email`);
  } catch (err) {
    toast({
      title: i18n.getResource(i18n.language, 'language', 'errors.AUTHENTICATION_FAILED'),
    });
  }
}

export function* logout() {
  try {
    yield call(api.logoutUser, {});

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(tokenName);
    }

    yield put(authActions.logoutSuccess());
    Router.push({
      pathname: '/login',
    });
  } catch (err) {
    yield put(authActions.logoutFailure({
      errors: extractErrors(err),
    }));
  }
}

export default function* () {
  yield all([
    takeLatest(INIT_VALUES, initValues),
    takeLatest(LOGIN_USER_REQUEST, loginUser),
    takeLatest(LOGOUT_REQUEST, logout),
  ]);
}
