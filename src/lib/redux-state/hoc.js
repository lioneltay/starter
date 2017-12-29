import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { SET_MODEL, CLEAR_STATE } from "./actions"

const callIfFunc = (candidate, ...args) =>
  typeof candidate === "function" ? candidate(...args) : candidate

const hoc = ({
  stateKey,
  initialState = {},

  selector = x => x,
  modelName,

  clearStateOnUnmount = true,

  rootKey = "reduxState",
  storeKey = "store",
}) => Comp => {
  @connect(
    state => {
      return {
        model: state[rootKey][stateKey],
      }
    },
    null,
    null,
    { storeKey }
  )
  class ReduxStateHOC extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      model: PropTypes.object,
    }

    componentWillMount() {
      this.props.dispatch({
        type: SET_MODEL,
        stateKey,
        model: callIfFunc(initialState, this.props),
      })
    }

    componentWillUnmount() {
      if (clearStateOnUnmount) {
        this.props.dispatch({ type: CLEAR_STATE, stateKey })
      }
    }

    // Like setState but with the data stored in the redux store instead of as local state
    setModel = model =>
      this.props.dispatch({ type: SET_MODEL, stateKey, model })

    render() {
      let newProps = {
        ...this.props,
        setModel: this.setModel,
      }

      const model = this.props.model || callIfFunc(initialState, this.props)

      if (modelName) {
        newProps[modelName] = model
      } else {
        newProps = { ...newProps, ...selector(model, this.props) }
      }

      return <Comp {...newProps} />
    }
  }

  return ReduxStateHOC
}

export default hoc
