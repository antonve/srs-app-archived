import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppLayout from './layouts/app'
import requireAuthentication from './../auth/components/protected_route'


import AuthLogin from './../auth/views/login'
import AuthRegister from './../auth/views/register'

export default (
  <Route path="/" component={AppLayout}>
    {'/* Auth */'}
    <Route path="login" component={AuthLogin} />
    <Route path="register" component={AuthRegister} />
  </Route>
)
