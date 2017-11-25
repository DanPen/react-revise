/**
 * @class StatusPanel
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import EditorHook from './EditorHook'

class StatusPanel extends Component {

  componentDidMount () {
    console.log(`${EditorHook.instances.filter(instance => instance.dirty).length} edits are dirty`)
  }

  render() {
    return <div>
      asdf
    </div>
  }
}

export default StatusPanel
