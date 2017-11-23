/**
 * @class EditorHook
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import invariant from 'invariant'

class EditorHook extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentWillMount () {
    const { children, editable } = this.props

    invariant(
      children == null || React.Children.count(children) === 1,
      'An <EditorHook> may have only one child element'
    )
  }

  renderChildren = () => {
    const { children } = this.props

    const newChildren = React.Children.map(children, child => {

      const additionalProps = this.setRef(child)

      return React.cloneElement(child, additionalProps)
    })

    return newChildren
  }

  setRef = (child) => {
    var refPropName = 'ref'

    if (child.type.name === 'StyledComponent')
      refPropName = 'innerRef'

    var additionalProps = {}
    additionalProps[refPropName] = (ref) => {ref.contentEditable = this.props.editable; this.grabRef(ref)}

    return additionalProps
  }

  render() {
    // We don't want to wrap a div or span around the children, because that could mess up the DOM and visuals
    return this.renderChildren()
  }

  grabRef = (ref) => {
    if (ref.)
    console.log(ref)
  }
}

export default EditorHook
