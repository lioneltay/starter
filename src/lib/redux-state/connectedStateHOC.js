import React, { Component } from "react"
import ConnectedState from "./ConnectedState"

const connectedState = options => Comp => {
  class ConnectedStateHOC extends Component {
    render() {
      return (
        <ConnectedState {...options}>
          {stateProps => <Comp {...stateProps} {...this.props} />}
        </ConnectedState>
      )
    }
  }

  return ConnectedStateHOC
}

export default connectedState
