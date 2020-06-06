import actionTypes from './actionTypes';

function saveTodo(todo) {
  const now = new Date();
  const added = `${now.getDay()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  const todoCopy = { ...todo, added };
  return {
    type: actionTypes.SAVE_DATA,
    item: 'todos',
    data: todoCopy,
  };
}

export default {
  saveTodo,
};
