import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
import { AppContainer } from 'react-hot-loader'

const root = document.getElementById('root')

const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)

declare const module: any

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').App)
  })
}
