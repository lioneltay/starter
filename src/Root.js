import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import TabDemo from "./TabDemo"
import ReactReduxFormDemo from "./ReactReduxFormDemo"

import SimpleForm from "ReduxFormDemo/SimpleForm"
import SyncValidationForm from "ReduxFormDemo/SyncValidationForm"
import FieldLevelValidationForm from "ReduxFormDemo/FieldLevelValidationForm"
import SubmitValidationForm from "ReduxFormDemo/SubmitValidationForm"
import AsyncValidationForm from "ReduxFormDemo/AsyncValidationForm"
import ArrayForm from "ReduxFormDemo/ArrayForm"
import ReduxStateDemo from "ReduxFormDemo/ReduxStateDemo"

import Example from "lib/redux-state/example"

import PropsStreamDemo from "./RecomposeDemo/PropsStreamDemo"

import AdvancedReactPatterns from "./AdvancedReactPatterns"

import EggheadLayout from "./MiniApps/EggheadLayout"

// import ReduxUIDemo from "./ReduxUIDemo/ReduxUIDemo"
import ReduxUIRemake from "./ReduxUIDemo/ReduxUIRemake"
// import ReduxUIRemake from "./ReduxUIDemo/ReduxUIRemakeRealLib"

import RxJSAnimation from "RxJSAnimation/RxJSAnimation"

import StateMonad from "StateMonad/StateMonad"

import StreamCourse from "RecomposeDemo/StreamCourse"

import LifeCycle from "./LifeCycle/LifeCycle"

import "./ImmutableDemo.js/RamdaDemo"

@connect(state => ({ state }))
export default class Root extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ border: "1px solid black", padding: "25px", width: "50%" }}
        >
          <ReduxUIRemake />
        </div>
        <div
          style={{ border: "1px solid black", padding: "25px", width: "50%" }}
        >
          <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
        </div>
      </div>
    )
  }
}
