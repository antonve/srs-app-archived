import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '~/common/reducers'
import DevTools from '~/common/containers/DevTools'

function ConfigureStore(initialState) {
  const logger = createLogger()
  const finalCreateStore = compose(
    applyMiddleware(promise, logger, thunk),
    DevTools.instrument(),
  )(createStore)

  const store = finalCreateStore(reducer, initialState)

  if (module.hot) {
    module.hot.accept('~/common/reducers', () => store.replaceReducer(reducer))
  }

  return store
}

export default ConfigureStore
