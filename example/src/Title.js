import React, { Component } from 'react'

import { connect } from 'react-redux'

let Title = (props) => (
  <h1>{props.articleTitle}</h1>
)

const mapStateToProps = (state) => ({
  articleTitle: state.title
})

const mapDispatchToProps = (dispatch) => ({

})

Title = connect(mapStateToProps, mapDispatchToProps)(Title)

export default Title
