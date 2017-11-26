# react-revise

Because every app deserves a WYSIWYG.<br />
Message your API through Webhooks whenever you edit your rendered components.

[![Travis](https://img.shields.io/travis/DanPen/react-revise.svg)](https://travis-ci.org/DanPen/react-revise) [![NPM](https://img.shields.io/npm/v/react-revise.svg)](https://www.npmjs.com/package/react-revise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Why
How many times have you made an amazing web application only to realize that your clients are going to need ability to change the content?

Or how often do you want to ditch bulky CMSs in favor of single page apps (or PWAs), but find out that implementing a full-fledged CMS in React would take ridiculous amounts of time?

That's why I created `react-revise`. Simply wrap whatever component you want to be able to edit in WYSIWYG-efficiency with an `<EditorHook>` and specify the API parameters. A single `<StatusPanel>` with a desired styled button is also required in order to display the dialog for saving changes (more customizability is planned).

```jsx
<EditorHook editable={true} hook='/api/blog/hello-world' verb='PUT' jsonKey='title'>
  <h1>Hello, World!</h1>
</EditorHook>

<StatusPanel saveButton={ButtonComponent} />
```

The `editable` property should be set to according to authentication status.

## Install

```bash
npm install --save react-revise
```

## Example Usage

```jsx
import React from 'react'

import { EditorHook } from 'react-revise'
import { StatusPanel } from 'react-revise'
import styled from 'styled-components'

const MyButton = styled.button`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0);
  outline: none;
  border: 1px solid #000;
`

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

        <StatusPanel saveButton={MyButton} />
      </div>
    )
  }
}

export default App
```

## License

MIT © [Daniel Pendergast](https://github.com/danpen)
