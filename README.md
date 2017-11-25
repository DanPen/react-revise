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
