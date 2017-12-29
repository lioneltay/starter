import React, { Component } from "react"
import PropTypes from "prop-types"
import { createStore } from "redux"

class StateProvider extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    reducer: PropTypes.func,
    children: PropTypes.any,
  }

  static defaultProps = {
    initialState: {},
    reducer: state => state,
  }

  static childContextTypes = {
    reduxStateStore: PropTypes.object,
    setModel: PropTypes.func,
    resetModel: PropTypes.func,
  }

  getChildContext() {
    return {
      reduxStateStore: this.store,
      setModel: state =>
        this.store.dispatch({ type: "__REDUX_STATE_SET_MODEL__", state }),
      resetModel: () =>
        this.store.dispatch({ type: "__REDUX_STATE_RESET_MODEL__" }),
    }
  }

  reducer = (_state = this.props.initialState, action) => {
    const state = this.props.reducer(_state, action)

    switch (action.type) {
      case "__REDUX_STATE_SET_MODEL__": {
        return { ...state, ...action.state }
      }
      case "__REDUX_STATE_RESET_MODEL__": {
        return this.props.initialState
      }
      default: {
        return state
      }
    }
  }

  store = createStore(this.reducer)

  render() {
    return this.props.children
  }
}

export default StateProvider
