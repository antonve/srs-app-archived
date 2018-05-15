import * as React from 'react'
import { DatabaseCollection, get, HeroSchema } from './Database'
import * as rxdbTypes from 'rxdb'

interface DatabaseExampleState {
  heroes: HeroSchema[]
}

export class DatabaseExample extends React.Component<{}, DatabaseExampleState> {
  state: DatabaseExampleState = {
    heroes: [],
  }

  componentDidMount() {
    this.getDatabaseReady().then()
  }

  getDatabaseReady = async () => {
    const db = await get()
    const collections: DatabaseCollection = db.collections
    collections.heroes.find().$.subscribe(heroes => {
      if (!heroes) return
      this.setState({
        heroes,
      })
    })
  }

  onButtonPress = async () => {
    const db = await get()
    const collections: DatabaseCollection = db.collections
    const time = new Date().getTime()
    collections.heroes.insert({
      name: `hero-${time}`,
      color: `color-${time}`,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonPress} type="button">
          Add Record
        </button>
        {this.state.heroes.map(hero => {
          return (
            <ul>
              <li>{`Name: ${hero.name}`}</li>
              <li>{`Color: ${hero.color}`}</li>
            </ul>
          )
        })}
      </div>
    )
  }
}
