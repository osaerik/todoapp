import { takeLatest, put, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import actionTypes from '../Actions/actionTypes';

function updateTodoIsCompleted(id, updatedTodo) {
  try {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const todosCopy = todos.map((item) => {
      if (item.id === id) return updatedTodo;
      return item;
    });
    localStorage.setItem('todos', JSON.stringify(todosCopy));
    return todosCopy;
  } catch (e) {
    return false;
  }
}

function* setTodoCompleted(action) {
  try {
    yield put({ type: 'AJAX_START' });

    if (!action.data || !action.data.id) return false;

    const dataCopy = { ...action.data, isCompleted: !action.data.isCompleted };

    const response = yield call(updateTodoIsCompleted, dataCopy.id, dataCopy);
    if (response === false) yield put({ type: 'AJAX_END', success: false, submitted: true });

    const notification = {
      id: uuidv4(), action: dataCopy.isCompleted ? 'completed' : 'added', text: dataCopy.text || '', datetime: dataCopy.added || '',
    };
    yield put({ type: actionTypes.SAVE_DATA, item: 'notifications', data: notification });
    yield put({ type: actionTypes.NOTIFICATION_UPDATE });

    yield put({ type: 'AJAX_END', success: true, submitted: true });

    return yield put({ type: actionTypes.GET_ALL_DATA_SUCCESS, data: response, item: 'todos' });
  } catch (e) {
    return yield put({ type: 'AJAX_END', success: false, submitted: true });
  }
}

const toDoSaga = [
  takeLatest(actionTypes.SET_TODO_COMPLETED, setTodoCompleted)];
export default toDoSaga;
