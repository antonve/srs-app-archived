import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import SessionReducer from './../auth/reducer'

const rootReducer = combineReducers({
  form: formReducer,
  session: SessionReducer,
  routing: routerReducer,
})

export default rootReducer;
