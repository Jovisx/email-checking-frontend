import { fork, all } from 'redux-saga/effects';

const req = require.context('.', true, /\.\/.+\/sagas\.js$/);
const sagas = req.keys().map(key => req(key).default);

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
