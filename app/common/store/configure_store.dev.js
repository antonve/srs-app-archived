import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'


function ConfigureStore(initialState) {
  const logger = createLogger()
  const finalCreateStore = compose(
    applyMiddleware(promise, logger, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore)

  const store = finalCreateStore(reducer, initialState)

  return store
}

export default ConfigureStore
