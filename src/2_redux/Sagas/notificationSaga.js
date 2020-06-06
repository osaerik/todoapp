import { takeLatest, put, call } from 'redux-saga/effects';
import actionTypes from '../Actions/actionTypes';

function getAllNotifications() {
  try {
    const notifications = JSON.parse(localStorage.getItem('notifications'));
    return notifications;
  } catch (e) {
    return [];
  }
}

function* getNrOfNotifications() {
  try {
    const response = yield call(getAllNotifications);
    const nrOfNotifications = response.length;

    yield put({ type: actionTypes.UPDATE_NOTIFICATION_NR, nrOfNotifications });
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_NOTIFICATION_NR, nrOfNotifications: 0 });
  }
}

const toDoSaga = [
  takeLatest(actionTypes.NOTIFICATION_UPDATE, getNrOfNotifications)];
export default toDoSaga;
