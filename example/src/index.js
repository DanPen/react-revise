import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'

import './index.css'
import App from './App'

const initialState = {
  title: 'Article 1'
}

function reducer (state=initialState, action) {
  switch (action.type) {

    case 'UPDATE_TITLE':
      return Object.assign({}, state, {
        title: action.title
      })

    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(<App store={store} />, document.getElementById('root'))
