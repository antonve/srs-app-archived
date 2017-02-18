import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './app';
/**
 * Straight up copy-paste from https://github.com/gaearon/react-hot-boilerplate/blob/next/src/index.js
 */

const appElement = document.getElementById('app');
const renderApp = Component =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appElement);
renderApp(App);
// Careful with the line below,
// second parameter of module.hot.accept accepts a callback that returns a render result,
// and not the result of a render itself.
if (module.hot) {
  module.hot.accept('./app', () => renderApp(App));
}

