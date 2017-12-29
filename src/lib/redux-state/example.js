// REDUX STATE LIB

import React, { Component } from "react"
import { reduxState } from "lib/redux-state"
import { connect } from "react-redux"
import * as R from "ramda"

// Usage in regular app once store setup
const ReduxStateUser1 = ({ favorite, name, email, setModel }) => {
  return (
    <div className="fj-s" style={{ border: "1px solid black", height: 50 }}>
      <input
        value={name || ""}
        onChange={e => setModel({ name: e.target.value })}
      />
      <input
        value={email || ""}
        onChange={e => setModel({ email: e.target.value })}
      />
      <input
        value={favorite || ""}
        onChange={e => setModel({ favorite: e.target.value })}
      />
    </div>
  )
}

const ReduxStateUser2 = ({ model, setModel }) => {
  return (
    <div className="fj-s" style={{ border: "1px solid black", height: 50 }}>
      <input
        value={model.name || ""}
        onChange={e => setModel({ name: e.target.value })}
      />
      <input
        value={model.email || ""}
        onChange={e => setModel({ email: e.target.value })}
      />
      <input
        value={model.favorite || ""}
        onChange={e => setModel({ favorite: e.target.value })}
      />
      <div className="ml-1">{JSON.stringify(model, null, 2)}</div>
    </div>
  )
}

const TransientState = reduxState({
  // storeKey: 'teststore',
  stateKey: "transientState",
  initialState: {
    name: "name initial value!",
    email: "email initial value!",
  },
  selector: model => ({
    email: model.name,
    name: model.email,
    favorite: model.favorite,
  }),
})(ReduxStateUser1)

const PersistState = reduxState({
  // storeKey: 'teststore',
  stateKey: "persistedState",
  initialState: {
    name: "name initial value!",
    email: "email initial value!",
  },
  modelName: "model",
  clearStateOnUnmount: false,
})(ReduxStateUser2)

const Demo = ({ cow, moo, lol, email, name, favorite }) => (
  <div>
    <div>{email}</div>
    <div>{name}</div>
    <div>{favorite}</div>
    <div>{cow}</div>
    <div>{moo}</div>
    <div>{lol}</div>
  </div>
)

const EDemo = R.compose(
  reduxState({
    stateKey: "transientState",
    selector: model => ({
      name: model.name + "1",
      email: model.email + "1",
      favorite: model.favorite + "1",
    }),
  }),
  reduxState({
    stateKey: "persistedState",
    clearStateOnUnmount: false,
    selector: model => ({
      cow: model.name + "[",
      moo: model.email + "p",
      lol: model.favorite + "p",
    }),
  })
)(Demo)

// App Setup
const ShowState = connect(state => ({ state }))(props => (
  <pre>{JSON.stringify(props.state.reduxState, null, 2)}</pre>
))

export default class Test extends Component {
  state = {
    showPersistent: true,
    showTransient: true,
  }

  render() {
    return (
      <div>
        <h2>ReduxStateExample</h2>
        <button
          onClick={() =>
            this.setState({ showTransient: !this.state.showTransient })
          }
        >
          Toggle Transient
        </button>
        <button
          onClick={() =>
            this.setState({ showPersistent: !this.state.showPersistent })
          }
        >
          Toggle Persistent
        </button>
        <ShowState />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        {this.state.showTransient && (
          <div>
            <TransientState />
            <TransientState />
          </div>
        )}
        {this.state.showPersistent && (
          <div>
            <PersistState />
            <EDemo />
          </div>
        )}
      </div>
    )
  }
}
