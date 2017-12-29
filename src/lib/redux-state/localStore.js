import { createStore, combineReducers } from "redux"

import React, { Component } from "react"
import PropTypes from "prop-types"

import reducer from "./reducer"

export default ({ storeKey = "store" } = {}) => Comp => {
  const store = createStore(combineReducers({ reduxState: reducer }))

  return class LocalStore extends Component {
    static childContextTypes = {
      [storeKey]: PropTypes.object,
    }

    getChildContext() {
      console.log("hello", storeKey)
      return {
        [storeKey]: store,
      }
    }

    render() {
      return <Comp {...this.props} />
    }
  }
}
