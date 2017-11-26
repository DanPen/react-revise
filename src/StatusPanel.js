/**
 * @class StatusPanel
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import EditorHook from './EditorHook'

class StatusPanel extends Component {

  static modalRoot = null

  constructor (props) {
    super(props)

    // Instantiate the modal root, with which we will render to through the portal below
    StatusPanel.modalRoot = document.createElement('div')
    StatusPanel.modalRoot.style.cssText = `
      position: fixed;
      bottom: 0px;
      width: 100vw;
      height: 60px;
      z-index: 100000;
    `
  }

  componentDidMount () {
    // Let the <EditorHook> instances know about this <StatusPanel> instance
    EditorHook.statusPanel = this
  }

  render() {
    const dirtyCount = EditorHook.instances.filter(instance => instance.state.dirty).length
    return ReactDOM.createPortal((
        <div>
          {dirtyCount} changes to be saved.
        </div>
      ),
      document.getElementById('root').parentNode.appendChild(StatusPanel.modalRoot)
    )
  }
}

export default StatusPanel
