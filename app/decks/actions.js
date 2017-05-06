import { List } from 'immutable'
import { Deck } from '~/decks/models/Deck'
import getDatabase from '~/data'

// Decks list
export const FETCH_DECKS = 'FETCH_DECKS'
export const FETCH_DECKS_SUCCESS = 'FETCH_DECKS_SUCCESS'
export const FETCH_DECKS_FAILURE = 'FETCH_DECKS_FAILURE'
export const RESET_DECKS = 'RESET_DECKS'

const actions = {
  fetchDecks: () => (dispatch) => {
    dispatch({ type: FETCH_DECKS })

    getDatabase('deck').then((col) => {
      col.query().sort('-weight').$.subscribe((decks) => {
        if (!decks) {
          dispatch({ type: FETCH_DECKS_FAILURE, payload: 'No decks found' })
          return
        }

        let collection = List()
        decks.each(deck => (
          collection = collection.push(new Deck(deck))
        ))
        debugger

        dispatch({ type: FETCH_DECKS_SUCCESS, payload: collection })
      })
    })
  },

  resetDecks: () => (dispatch) => {
    dispatch({
      type: RESET_DECKS,
    })
  },
}

export default actions
