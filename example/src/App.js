import React, { Component } from 'react'

import { EditorHook } from 'react-revise'

import Title from './Title'
import Button, { SuperButton } from './Button'

import { Provider } from 'react-redux'

export default class App extends Component {
  state = {
    editable: false
  }



  render () {
    return (
      <div>
        <input type="checkbox" onChange={(e) => this.setState({
          editable: e.target.checked
        })} />
        <EditorHook editable={this.state.editable}>
          <h1>Hello, World!</h1>
        </EditorHook>

        <EditorHook editable={this.state.editable}>
          <div>Dolor pariatur reprehenderit minim laborum enim irure qui adipisicing eiusmod. Lorem do eu aute elit cupidatat exercitation et non minim. Laborum nulla dolor voluptate sit officia consectetur fugiat commodo ad cillum est laborum. Enim laborum reprehenderit enim duis ad sunt culpa laboris magna reprehenderit sit laboris et. Amet aliquip duis laborum laborum cillum tempor aliquip ut occaecat aliqua reprehenderit ut. Dolor veniam exercitation occaecat magna dolore aute ipsum ea in in. Non culpa laborum nulla do non consectetur enim do cupidatat nulla proident sint commodo cillum ea. Tempor labore ex excepteur sint ipsum ipsum consectetur cillum cillum occaecat incididunt deserunt excepteur deserunt aliqua pariatur.</div>
        </EditorHook>

        <p>
          <EditorHook editable={this.state.editable}>
            <span>
              Dolor pariatur reprehenderit minim laborum enim irure qui adipisicing eiusmod.
            </span>
          </EditorHook>
          <span>
            Lorem do eu aute elit cupidatat exercitation et non minim. Laborum nulla dolor voluptate sit officia consectetur fugiat commodo ad cillum est laborum. Enim laborum reprehenderit enim duis ad sunt culpa laboris magna reprehenderit sit laboris et. Amet aliquip duis laborum laborum cillum tempor aliquip ut occaecat aliqua reprehenderit ut. Dolor veniam exercitation occaecat magna dolore aute ipsum ea in in. Non culpa laborum nulla do non consectetur enim do cupidatat nulla proident sint commodo cillum ea. Tempor labore ex excepteur sint ipsum ipsum consectetur cillum cillum occaecat incididunt deserunt excepteur deserunt aliqua pariatur.
          </span>
        </p>
      </div>
    )
  }
}
