import actionTypes from '../Actions/actionTypes';

const defaultState = {
  todos: [],
  notifications: [],
};

export default function dataReducer(state = defaultState, action) {
  switch (action.type) {
  case actionTypes.GET_ALL_DATA_SUCCESS:
    return {
      ...state,
      [action.item]: action.data,
    };
  case actionTypes.SAVE_DATA_SUCCESS:
    return {
      ...state,
      [action.item]: action.data,
    };

  default:
    return state;
  }
}
