import React, { Component } from "react"
import PropTypes from "prop-types"

// @connect(state => ({ state }), null, null, { storeKey: "reduxStateStore" })
class ConnectedState extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
  }

  static contextTypes = {
    reduxStateStore: PropTypes.object.isRequired,
    setModel: PropTypes.func.isRequired,
    resetModel: PropTypes.func.isRequired,
  }

  render() {
    return this.props.children({
      ...this.props.state,
      state: this.props.state,

      setModel: this.context.setModel,
      resetModel: this.context.resetModel,
      dispatch: this.context.reduxStateStore.dispatch,
    })
  }
}

export default ConnectedState
