import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"

class FormBuilder extends Component {
  constructor(props) {
    super(props)
    console.log(props.formData)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.target
  }

  render() {
    return <form onSubmit={this.handleSubmit} />
  }
}

export default FormBuilder
