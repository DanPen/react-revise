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
      z-index: 100000;

      bottom: 0px;
      width: 100vw;
      padding: 1rem;
      box-sizing: border-box;

      text-align: right;
    `
  }

  componentDidMount () {
    // Let the <EditorHook> instances know about this <StatusPanel> instance
    EditorHook.statusPanel = this
  }

  render() {
    const dirtyCount = EditorHook.instances.filter(instance => instance.state.dirty).length
    const Button = this.props.saveButton

    const inlineBlock = {
      display: 'inline-block',
      verticalAlign: 'middle'
    }

    return ReactDOM.createPortal((
        <div>
          <div style={{...inlineBlock, fontSize: '1.2rem'}}>{dirtyCount} changes</div>
          <div style={{...inlineBlock, marginLeft: '1rem'}}><Button>save</Button></div>
        </div>
      ),
      document.getElementById('root').parentNode.appendChild(StatusPanel.modalRoot)
    )
  }
}

export default StatusPanel
