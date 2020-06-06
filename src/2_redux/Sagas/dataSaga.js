import { takeLatest, put, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import actionTypes from '../Actions/actionTypes';

function getAllFromStorage(item) {
  try {
    const data = JSON.parse(localStorage.getItem(item) || '[]');
    return data;
  } catch (e) {
    return false;
  }
}

function saveToStorage(item, data) {
  try {
    const dataCopy = { ...data };
    const storageItems = localStorage.getItem(item) || '[]';
    const items = JSON.parse(storageItems);
    if (!dataCopy.id) dataCopy.id = uuidv4();
    items.push(dataCopy);
    localStorage.setItem(item, JSON.stringify(items));
    return items;
  } catch (e) {
    return false;
  }
}

function removeFromStorage(item, id) {
  const items = JSON.parse(localStorage.getItem(item));
  const itemsCopy = items.filter((i) => i.id !== id);
  localStorage.setItem(item, JSON.stringify(itemsCopy));
  return itemsCopy;
}


function* getAll(action) {
  try {
    yield put({ type: 'AJAX_START' });

    if (!action.item) return false;

    const response = yield call(getAllFromStorage, action.item);

    const { item } = action;

    yield put({ type: 'AJAX_END', success: true, submitted: true });
    return yield put({ type: `${action.type}_SUCCESS`, data: response, item });
  } catch (e) {
    return yield put({ type: 'AJAX_END', success: false, submitted: true });
  }
}

function* save(action) {
  try {
    yield put({ type: 'AJAX_START' });

    if (!action.item || !action.data) return false;

    const response = yield call(saveToStorage, action.item, action.data);
    if (response === false) yield put({ type: 'AJAX_END', success: false, submitted: true });

    const { item } = action;
    if (action.item !== 'notifications') {
      const notification = {
        id: uuidv4(), action: 'added', text: action.data.text || '', datetime: action.data.added || '',
      };
      const notificationsResponse = yield call(saveToStorage, 'notifications', notification);
      const notifications = notificationsResponse || [];
      yield put({ type: actionTypes.GET_ALL_DATA_SUCCESS, data: notifications, item: 'notifications' });
    }
    yield put({ type: actionTypes.NOTIFICATION_UPDATE });

    yield put({ type: 'AJAX_END', success: true, submitted: true });

    return yield put({ type: `${action.type}_SUCCESS`, data: response, item });
  } catch (e) {
    return yield put({ type: 'AJAX_END', success: false, submitted: true });
  }
}

function* remove(action) {
  try {
    yield put({ type: 'AJAX_START' });

    if (!action.data || !action.data.id || !action.item) return false;

    const response = yield call(removeFromStorage, action.item, action.data.id);
    if (response === false) yield put({ type: 'AJAX_END', success: false, submitted: true });

    if (action.item !== 'notifications') {
      const notification = {
        id: uuidv4(), action: 'removed', text: action.data.text || '', datetime: action.data.added || '',
      };
      const notificationsResponse = yield call(saveToStorage, 'notifications', notification);
      const notifications = notificationsResponse || [];
      yield put({ type: actionTypes.GET_ALL_DATA_SUCCESS, data: notifications, item: 'notifications' });
    }
    yield put({ type: actionTypes.NOTIFICATION_UPDATE });

    yield put({ type: 'AJAX_END', success: true, submitted: true });

    return yield put({ type: actionTypes.GET_ALL_DATA_SUCCESS, data: response, item: action.item });
  } catch (e) {
    return yield put({ type: 'AJAX_END', success: false, submitted: true });
  }
}

const dataSaga = [
  takeLatest(actionTypes.GET_ALL_DATA, getAll),
  takeLatest(actionTypes.SAVE_DATA, save),
  takeLatest(actionTypes.DELETE_DATA, remove)];
export default dataSaga;
