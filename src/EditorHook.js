/**
 * @class EditorHook
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import invariant from 'invariant'

import ReactDOM from 'react-dom'


class EditorHook extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentWillMount () {
    const { children } = this.props

    invariant(
      children == null || React.Children.count(children) === 1,
      'An <EditorHook> may have only one child element'
    )
  }

  componentDidMount () {
    const { children, editable } = this.props

    const childrenArray = React.Children.toArray(children)
    const realElement = ReactDOM.findDOMNode(this.refs['0'])
    const imaginaryElement = ReactDOM.findDOMNode(this.refs['1'])

    // Give the imaginary element an absolute position, pointed to where realElement is
    const boundingBox = realElement.getBoundingClientRect()
    imaginaryElement.style.cssText +=';'+ `
      position: absolute;
      top: ${boundingBox.top}px;
      left: ${boundingBox.left}px;
      width: ${boundingBox.width}px;
      height: ${boundingBox.height}px;
    `

    this.toggleEditible(editable, realElement, imaginaryElement)
  }

  componentWillReceiveProps (nextProps) {
    const realElement = ReactDOM.findDOMNode(this.refs['0'])
    const imaginaryElement = ReactDOM.findDOMNode(this.refs['1'])

    this.toggleEditible(nextProps.editable, realElement, imaginaryElement)
  }

  toggleEditible = (editable) => {
    const realElement = ReactDOM.findDOMNode(this.refs['0'])
    const imaginaryElement = ReactDOM.findDOMNode(this.refs['1'])
    // When in edit mode:
    // hide real element, show imaginaryElement
    // Use visibility:hidden on realElement because we don't want the page to re-layout, in the case that it has position: static
    // Use display:none on imaginaryElement because we have no need to render it at all

    // TODO: The imaginaryElement's value needs to be set everytime we go into edit mode
    if (editable) {
      realElement.style.visibility = 'hidden'
      imaginaryElement.style.display = 'block'
    } else {
      realElement.style.visibility = 'visible'
      imaginaryElement.style.display = 'none'
    }
  }

  renderChildren = () => {
    const { children, editable } = this.props

    // Map a ref to the (currently) single child element and discard the previous child
    const child = React.Children.only(children)
    const newChild =  React.cloneElement(child, { ref: 0, key: 0 })

    // Create the editable child
    const editableChild = <textarea ref='1' key='1' value={newChild.props.children} />

    return [newChild, editableChild]
  }

  render() {
    // We don't want to wrap a div or span around the children, because that could mess up the DOM due to the disparities of display:block and display:inline
    return this.renderChildren()
  }
}

export default EditorHook
