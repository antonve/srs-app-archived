import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import SessionReducer from './../auth/reducer'

const rootReducer = combineReducers({
  form: formReducer,
  session: SessionReducer,
})

export default rootReducer;
