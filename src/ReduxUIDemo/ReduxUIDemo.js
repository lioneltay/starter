import React, { Component } from "react"
import PropTypes from "prop-types"
import { compose, setDisplayName } from "recompose"

import ui from "redux-ui"

const ChildComponent = compose(
  ui({
    // key: "bobs",
    state: {
      childVar: "child value",
    },
  }),
  setDisplayName("ChildComponent")
)(({ updateUI, ui: { parentVar, childVar } }) => (
  <div>
    <div>ParentVar: {parentVar}</div>
    <div onClick={() => updateUI({ childVar: "ops" })}>
      ChildVar: {childVar}
    </div>
  </div>
))

@ui({
  state: {
    parentVar: "parent value",
  },
})
export default class ReduxUIDemo extends Component {
  render() {
    return (
      <div>
        <h1>redux-ui Demo</h1>

        <button onClick={() => this.props.updateUI({ parentVar: "Updated!" })}>
          Test Me
        </button>

        <div>
          <ChildComponent />
          <ChildComponent />
          <ChildComponent />
          <ChildComponent />
        </div>
      </div>
    )
  }
}
