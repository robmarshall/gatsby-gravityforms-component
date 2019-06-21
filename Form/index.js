import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/Layout"

class GravityFormForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div />
  }
}

GravityFormForm.defaultProps = {
  apiUrl: true,
  slug: true,
  fields: [],
  button: true,
}

GravityFormForm.propTypes = {
  id: PropTypes.number,
  slug: PropTypes.bool,
  fields: PropTypes.array,
  button: PropTypes.bool,
  api: PropTypes.bool,
}
