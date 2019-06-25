import React, { Component } from "react"
import PropTypes from "prop-types"

class FormBuilder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // Set value and error state for form fields
    // Access field by ID
    props.formData.formFields.forEach(field => {
      this.state.fields[field.id] = {
        value: "",
        error: "",
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.target
  }

  handleChange(event) {
    event.preventDefault()
  }

  render() {
    const formData = this.props.formData

    const fields = formData.formFields.map(field => {
      let newInput = [field.id]

      return (
        <div className={field.cssClass} key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            id={field.id}
            name={field.id}
            type="text"
            value={this.state.fields[field.id].value}
            onChange={this.handleChange}
          />
        </div>
      )
    })

    return (
      <form onSubmit={this.handleSubmit}>
        {fields}
        <input
          type="submit"
          value={formData.button.text ? formData.button.text : "Submit"}
        />
      </form>
    )
  }
}

export default FormBuilder
