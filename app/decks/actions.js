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

        dispatch({ type: FETCH_DECKS_SUCCESS, payload: decks })
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
