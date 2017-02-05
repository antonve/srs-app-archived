import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './common/routes'
import configureStore from './common/store/configure_store';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'),
)
