import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../2_redux/Actions/actionTypes';
import todoActions from '../../2_redux/Actions/todoActions';

const ToDo = () => {
  const localStorageLocation = 'todos';
  const [todo, setTodo] = useState({ text: '' });
  const [showCompleted, setShowCompleted] = useState(false);

  const todos = useSelector((state) => state.dataReducer.todos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.GET_ALL_DATA, item: localStorageLocation });
  }, [dispatch]);

  const resetTodo = () => setTodo({ text: '' });

  const save = () => {
    if (!todo.text || todo.text.length === 0) return;
    todo.isCompleted = false;
    dispatch(todoActions.saveTodo(todo));
    resetTodo();
  };

  const onKeyDown = (e) => (e.keyCode === 13 ? save() : null);

  const setCompleted = (data) => {
    dispatch({ type: actionTypes.SET_TODO_COMPLETED, data });
  };

  const deleteTodo = (data) => {
    dispatch({ type: actionTypes.DELETE_DATA, data, item: localStorageLocation });
  };


  return (
    <>
      <h1 className="todo__header">Eriks ToDo List</h1>
      <div className="todo__main">
        <div className="todo__add">
          <input
            type="text"
            className="todo__add-input"
            placeholder="New todo"
            value={todo.text}
            onChange={(e) => setTodo({ text: e.target.value })}
            onKeyDown={(e) => onKeyDown(e)}
          />
          <button type="button" className="todo__add-button" onClick={() => save()}>Add +</button>
        </div>
        <div className="todo__list">
          {todos.map((item) => (
            ((showCompleted && item.isCompleted) || (!item.isCompleted)) && (
              <div className="todo__list-item" key={item.id}>
                <span className="todo__list-item-text">{item.text}</span>

                <button
                  type="button"
                  className="button--icon"
                  aria-label="Complete item"
                  onClick={() => setCompleted(item)}
                >
                  <i className={`icon icon--check ${!item.isCompleted ? 'icon--check-disabled' : ''}`} />
                </button>

                <button
                  type="button"
                  className="button--icon"
                  aria-label="Delete item"
                  onClick={() => deleteTodo(item)}
                >
                  <i className="icon icon--cross " />
                </button>

              </div>
            )
          ))}
        </div>
        <div className="todo__show-done">
          <div className="todo__show-done-text">
            <div className="todo__show-done-maintext">Show completed items?</div>
            <div className="todo__show-done-subtext">{`Toggle switch to ${showCompleted ? 'hide' : 'show'} completed items`}</div>
          </div>
          <button
            type="button"
            aria-label="toggle completed"
            className={`button--toggle todo__show-done-toggle ${showCompleted ? '' : 'button--toggle-off'}`}
            onClick={() => setShowCompleted(!showCompleted)}
          />
        </div>
      </div>
    </>
  );
};

export default ToDo;
