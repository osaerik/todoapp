import { all } from 'redux-saga/effects';
import dataSaga from './dataSaga';
import toDoSaga from './toDoSaga';
import notificationSaga from './notificationSaga';

export default function* rootSaga() {
  yield all([...dataSaga, ...toDoSaga, ...notificationSaga]);
}
