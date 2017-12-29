import React, { Component } from "react"
import PropTypes from "prop-types"

export default class UpdateBlocker extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return this.props.children
  }
}
