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

  static instances = []

  // Set by StatusPanel
  static statusPanel = null

  constructor (props) {
    super(props)

    this.state = {
      originalValue: '',
      value: '',
      dirty: false,
      defaultDisplay: ''
    }

    EditorHook.instances.push(this)
  }

  realElement = null
  imaginaryElement = null

  mutationObserver = null
  windowResizeObserver = null

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
    this.realElement = ReactDOM.findDOMNode(this.refs['0'])
    this.imaginaryElement = ReactDOM.findDOMNode(this.refs['1'])

    // Apply the computed styles to the <textarea>
    const computedStyle = window.getComputedStyle(this.realElement)
    let css = ''
    Object.keys(computedStyle).map(key => {
      // Ignore several positioning keys
      switch (key) {
        case 'position':
        case 'margin':
        case 'marginLeft':
        case 'marginRight':
        case 'marginTop':
        case 'marginBottom':
        case 'left':
        case 'right':
        case 'top':
        case 'bottom':
          return
      }
      // Ignore numerical indexes
      if (!isNaN(key))
        return

      css += `${camelCaseToDash(key)}: ${computedStyle[key]};\n`
    })
    css += 'position: absolute;'
    this.imaginaryElement.style.cssText += css

    this.recalculatePosition()
    this.setupMutationObserver()
    this.setupWindowResizeObserver()

    this.toggleEditible(editable)

    // Save the default display mode for the realElement, so we can revert to it later (block, span, etc)
    this.setState({
      defaultDisplay: computedStyle.display
    })
  }

  setupMutationObserver = () => {
    this.mutationObserver = new MutationObserver( mutations => {
      mutations.forEach(() => {
        this.recalculatePosition()
      })
    })

    this.mutationObserver.observe(this.realElement, {
      attributes: true,
      subtree: false
    })
  }

  setupWindowResizeObserver = () => {
    this.windowResizeObserver = window.addEventListener('resize', this.recalculatePosition)
  }

  recalculatePosition = () => {
    // Give the <textarea> an absolute position, pointed to where realElement is
    const boundingBox = this.realElement.getBoundingClientRect()
    this.imaginaryElement.style.cssText +=''+ `
      top: ${boundingBox.top + window.scrollY}px;
      left: ${boundingBox.left + window.scrollX}px;
      width: ${boundingBox.width}px;
      height: ${boundingBox.height}px;
    `
  }

  componentWillReceiveProps (nextProps) {
    this.toggleEditible(nextProps.editable)
  }

  toggleEditible = (editable) => {
    const childrenArray = React.Children.toArray(this.props.children)
    const realComponent = childrenArray[0]

    // When in edit mode:
    // hide real element, show imaginaryElement
    if (editable) {
      this.realElement.style.visibility = 'hidden'
      this.imaginaryElement.style.display = this.state.defaultDisplay

      // The imaginaryElement's value needs to be set everytime we go into edit mode
      // TODO: Certify that realComponent has a string as its only child
      this.setState({
        originalValue: realComponent.props.children,
        value: realComponent.props.children,
        dirty: false
      })
    } else if (!editable && this.props.editable) {
      this.realElement.style.visibility = 'visible'
      this.imaginaryElement.style.display = 'none'

      // TODO: Call Webhook to save the changes
      this.save()
    }
  }

  onEdit = (event) => {
    this.setState({
      value: event.target.value,
      dirty: event.target.value !== this.state.originalValue
    })
  }

  save = () => {
    if (!this.state.dirty)
      return

    const hookTokenized = this.props.hook.split(' ')
    const verb = hookTokenized[0].toUpperCase()
    const path = hookTokenized[1]

    console.log('saving '+this.props.jsonKey)

    const payload = JSON.stringify({
      [this.props.jsonKey]: this.state.value
    })

    fetch(path, {
      method: verb,
      body: payload
    })
  }

  renderChildren = () => {
    const { children, editable } = this.props

    // Map a ref to the (currently) single child element and discard the previous child
    const child = React.Children.only(children)
    const newChild =  React.cloneElement(child, { ref: 0, key: 0 })

    // Create the editable child
    const editableChild = <textarea ref='1' key='1' value={this.state.value} onChange={this.onEdit} />

    return [newChild, editableChild]
  }

  componentWillUpdate (nextProps, nextState) {
    // Let the single StatusPanel instance know that it needs to update iff our dirty field has changed
    if (this.state.dirty !== nextState.dirty)
      EditorHook.statusPanel.forceUpdate()
  }

  render() {
    // We don't want to wrap a div or span around the children, because that could mess up the DOM due to the disparities of display:block and display:inline
    // So we'll use React 16's feature of rendering multiple children through arrays
    return this.renderChildren()
  }
}

function camelCaseToDash(input){
  // Replace Capital letter with the letter + a dash: '-', then lowercase everything.
  return input.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export default EditorHook
