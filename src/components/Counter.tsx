import * as React from "react"

interface CounterState {
  count: number
}

export default class Counter extends React.Component<{}, CounterState> {
  state = {
    count: 0,
  }

  render() {
    return (
      <div>
        <h1>Counter!!!</h1>
        <h1>{this.state.count}</h1>
        <button
          onClick={() =>
            console.log("yeaaa") ||
            this.setState(state => ({ count: state.count + 1 }))
          }
        >
          +
        </button>
        <button
          onClick={() => this.setState(state => ({ count: state.count + 1 }))}
        >
          -
        </button>
      </div>
    )
  }
}
