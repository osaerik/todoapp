import actionTypes from '../Actions/actionTypes';

const defaultState = {
  nrOfNotifications: 0,
  showNotifications: false,
};

export default function notificationReducer(state = defaultState, action) {
  switch (action.type) {
  case actionTypes.TOGGLE_NOTIFICATIONS:
    return {
      ...state,
      showNotifications: !state.showNotifications,
    };
  case actionTypes.UPDATE_NOTIFICATION_NR:
    return {
      ...state,
      nrOfNotifications: action.nrOfNotifications,
    };

  default:
    return state;
  }
}
