import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './common/routes'
import configureStore from './common/store/configure_store'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
)

export default App
