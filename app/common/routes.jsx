import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppLayout from '~/common/layouts/app'
import requireAuthentication from '~/auth/components/protected_route'

import DecksOverview from '~/decks/views/Overview'
import AuthLogin from '~/auth/views/login'
import AuthRegister from '~/auth/views/register'

export default (
  <Route path="/" component={AppLayout}>
    <IndexRoute component={DecksOverview}/>
    {'/* Auth */'}
    <Route path="login" component={AuthLogin}/>
    <Route path="register" component={AuthRegister}/>
  </Route>
)
