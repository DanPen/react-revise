# react-revise

Because every app deserves a WYSIWYG.<br />
Message your API through Webhooks whenever you edit your rendered components.

[![Travis](https://img.shields.io/travis/DanPen/react-revise.svg)](https://travis-ci.org/DanPen/react-revise) [![NPM](https://img.shields.io/npm/v/react-revise.svg)](https://www.npmjs.com/package/react-revise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Codetally](http://www.codetally.com/shield/DanPen/react-revise?style=social)](http://www.codetally.com/index.html#/DanPen/react-revise)

## Install

```bash
npm install --save react-revise
```

## Usage

```js
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
```

## License

MIT © [Daniel Pendergast](https://github.com/danpen)
