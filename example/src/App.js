import React from 'react'

import { EditorHook } from 'react-revise'

class App extends React.Component {
  state = {
    editable: false
  }

  render () {
    return (
      <div>
        <input id="checkbox" type="checkbox" onChange={(e) => this.setState({
          editable: e.target.checked
        })} />
        <label for="checkbox"> edit</label>

        <EditorHook editable={this.state.editable}
          hook={`/api/blog/hello-world`}
          verb='PUT'
          jsonKey='title'>

          <h1>Hello, World!</h1>

        </EditorHook>

        <EditorHook editable={this.state.editable}
          hook={`/api/blog/hello-world`}
          verb='PUT'
          jsonKey='body'>

          <p>
            Tempor mollit dolore culpa occaecat labore voluptate Lorem esse. Reprehenderit esse mollit ullamco ullamco fugiat consequat nulla nostrud. Nisi dolore veniam proident ea eiusmod mollit excepteur. Laborum esse minim est proident ex velit ut eu culpa.
          </p>

        </EditorHook>
      </div>
    )
  }
}

export default App
