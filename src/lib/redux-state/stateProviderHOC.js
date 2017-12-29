import React, { Component } from "react"
import StateProvider from "./StateProvider"

const stateProvider = options => Comp => {
  class StateProviderHOC extends Component {
    render() {
      return (
        <StateProvider {...options}>
          <Comp {...this.props} />
        </StateProvider>
      )
    }
  }

  return StateProviderHOC
}

export default stateProvider
