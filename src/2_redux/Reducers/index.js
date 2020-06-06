import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import notificationReducer from './notificationReducer';

const reducers = combineReducers({ dataReducer, notificationReducer });

export default reducers;
