import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { Control, Form, actions } from "react-redux-form"

@connect(state => ({ state }))
export default class UserForm extends Component {
  handleSubmit(user) {
    // Do whatever you like in here.
    // If you connect the UserForm to the Redux store,
    // you can dispatch actions such as:
    // dispatch(actions.submit('user', somePromise));
    // etc.

    console.log("submit", user)
  }

  render() {
    return (
      <div>
        <Form model="forms.dogs" onSubmit={user => this.handleSubmit(user)}>
          <label htmlFor="forms.dogs.firstName">First name:</label>
          <Control.text model="forms.dogs.firstName" id="user.firstName" />

          <label htmlFor="forms.dogs.lastName">Last name:</label>
          {/* <Control.text model="dogs.lastName" id="user.lastName" /> */}

          <button type="submit">Finish registration!</button>
        </Form>

        <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
      </div>
    )
  }
}
