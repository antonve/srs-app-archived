import { Record } from 'immutable'

const DeckRecord = Record({ name: null, description: null, weight: 0 })

class Deck extends DeckRecord {

}

export default Deck
