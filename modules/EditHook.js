import React from 'react'
import invariant from 'invariant'

class EditHook extends React.Component {
  state = {
    editing: false
  }

  componentWillMount () {
    const { children } = this.props

    invariant(
      children == null || React.Children.count(children) === 1,
      'An <EditHook> may have only one child element'
    )
  }
}
