import React, { Component } from 'react'

import styled from 'styled-components'

const Button = styled.button`
  color: green;
  background: purple;
`

const SuperButton = styled(Button)`
  font-size: 40px;
`

export default Button
export { SuperButton }
