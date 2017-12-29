import React, { Component } from "react"
import PropTypes from "prop-types"

import UpdateBlocker from "./UpdateBlocker"
import { StateProvider, ConnectedState } from "lib/redux-state"

const Com = ({ inputValue, counter, dispatch, setModel, resetModel }) => (
  <div>
    <h1>Input!</h1>
    <input
      value={inputValue}
      onChange={e => setModel({ inputValue: e.target.value })}
    />
    <h5>Counter: {counter}</h5>
    <button onClick={() => dispatch({ type: "inc" })}>Increment</button>
    <button onClick={resetModel}>Reset</button>
  </div>
)

export default class Root extends Component {
  static propTypes = {
    handler1: PropTypes.func,
  }

  render() {
    return (
      <StateProvider
        initialState={{ counter: 3, inputValue: "hello" }}
        reducer={(state, action) => {
          switch (action.type) {
            case "inc": {
              return {
                ...state,
                counter: state.counter + 1,
              }
            }
            default: {
              return state
            }
          }
        }}
      >
        <UpdateBlocker>
          <div>
            <ConnectedState>{Com}</ConnectedState>
            <ConnectedState>
              {({ state }) => <pre>{JSON.stringify(state, null, 2)}</pre>}
            </ConnectedState>
          </div>
        </UpdateBlocker>
      </StateProvider>
    )
  }
}
