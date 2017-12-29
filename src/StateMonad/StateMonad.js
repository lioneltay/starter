import React, { Component } from "react"
import PropTypes from "prop-types"

import log from "./logger"

import { State, Pair } from "crocks"

export default class StateMonad extends Component {
  render() {
    return <div>StateMonad</div>
  }
}

// State s a
// (s -> (a, s))

// updateValue :: Number -> State Number
const updateValue = x => State(s => Pair(s + x, s))

// updateState :: Number -> State Number
const updateState = x => State(s => Pair(s + x, s))

// m :: State Number Number
const m = State(state => Pair(state + 5, state))

console.log(
  updateValue(10)
    .runWith(45)
    .snd()
)
