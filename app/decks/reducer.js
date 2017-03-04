import { List, Map } from 'immutable'
import {
  FETCH_DECKS, FETCH_DECKS_SUCCESS, FETCH_DECKS_FAILURE, RESET_DECKS,
} from './actions'

const initialState = {
  decksList: Map({ decks: List(), loading: false, error: null }),
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        decksList: state.decksList.set('loading', true),
      }

    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        decksList: state.decksList
          .set('loading', false)
          .set('decks', action.payload),
      }

    case FETCH_DECKS_FAILURE:
      return {
        ...state,
        decksList: state.decksList
          .set('loading', false)
          .set('decks', List())
          .set('error', action.payload),
      }

    case RESET_DECKS:
      return {
        ...state,
        decksList: initialState.decksList,
      }

    default:
      return state
  }
}
