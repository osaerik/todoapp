import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './Reducers';
import initSagas from './Sagas/0_init';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));

  initSagas(sagaMiddleware);

  return store;
}
