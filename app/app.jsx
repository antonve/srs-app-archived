import React from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './common/routes'
import configureStore from './common/store/configure_store'
import DevTools from './common/containers/DevTools'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)
const isProduction = (process.env.NODE_ENV === 'production')

const App = () => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes}/>
      {!isProduction && <DevTools/>}
    </div>
  </Provider>
)

export default App
