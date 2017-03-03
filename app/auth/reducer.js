import {
  AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_RESET,
  AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
} from './actions'

const initialState = {
  currentUser: null,
  failed: false,
  errors: [],
  registered: false,
  registerData: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        failed: false,
        errors: [],
      }

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        failed: true,
        errors: ['Invalid Credentials'],
      }

    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        registerData: action.payload,
      }

    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        registered: false,
        registerData: action.payload,
      }

    case AUTH_RESET:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
