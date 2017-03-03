import React from 'react'

import ListContainer from './../containers/List'

function Overview() {
  return (
    <div>
      <h1>Decks</h1>
      <a onClick={null}>Add deck</a>
      <ListContainer decks={[{ name: 'test' }]}/>
    </div>
  )
}


export default Overview
