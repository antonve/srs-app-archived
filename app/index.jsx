import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import App from './app'

/**
 * Source: https://github.com/gaearon/react-hot-boilerplate/blob/next/src/index.js
 */
const appElement = document.getElementById('app')
const renderApp = Component =>
  render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    appElement,
  )

renderApp(App)
if (module.hot) {
  module.hot.accept('./app', () => renderApp(App))
}
