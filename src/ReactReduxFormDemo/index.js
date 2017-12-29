import React, { Component } from "react"
import PropTypes from "prop-types"

import { Provider } from "react-redux"

import store from "./store.js"

import UserForm from "./UserForm"

export default class ReactReduxFormDemo extends Component {
  render() {
    return (
      <div>
        <div>
          <Provider store={store}>
            <UserForm />
          </Provider>
        </div>
      </div>
    )
  }
}
