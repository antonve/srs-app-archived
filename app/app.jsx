import React from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './common/routes'
import configureStore from './common/store/configure_store'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
)

export default App
