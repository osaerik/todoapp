import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './2_redux/store';
import HomePage from './0_pages/HomePage';

import './3_style/index.scss';

const store = configureStore();

const TodoApp = (
  <Provider store={store}>
    <BrowserRouter>
      <>
        <main className="main">
          <Route path="/" exact component={HomePage} />
        </main>
      </>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(TodoApp, document.getElementById('app'));
