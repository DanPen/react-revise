# react-revise

Because every app deserves a WYSIWYG.<br />
Message your API through Webhooks whenever you edit your rendered components.

[![NPM](https://img.shields.io/npm/v/react-revise.svg)](https://www.npmjs.com/package/react-revise) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-revise
```

## Usage

```js
import React, { Component } from 'react'

import { EditorHook } from 'react-revise'

class Example extends Component {
  render () {
    return (
      <EditorHook><h1>Hello, World!</h1></EditorHook>
    )
  }
}
```

## License

MIT © [Daniel Pendergast](https://github.com/danpen)
