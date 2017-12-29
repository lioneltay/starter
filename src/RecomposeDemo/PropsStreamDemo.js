import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  mapPropsStream,
  createEventHandler,
  componentFromStream,
  setObservableConfig,
} from "recompose"
import { Observable } from "rxjs"

import rxjsconfig from "recompose/rxjsObservableConfig"
setObservableConfig(rxjsconfig)

const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()
  props$.subscribe({ next: val => console.log("prop", val) })

  const count$ = Observable.merge(
    increment$
      .mapTo(1)
      .withLatestFrom(props$, (dif, { multiplier }) => dif * multiplier),
    decrement$.mapTo(-1)
  )
    .startWith(0)
    .scan((count, n) => count + n, 0)

  return props$.combineLatest(count$, (props, count) => (
    <div {...props}>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  ))
})

const enhance = mapPropsStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler()
  const { handler: decrement, stream: decrement$ } = createEventHandler()
  props$.subscribe({ next: val => console.log("prop", val) })

  const count$ = Observable.merge(
    increment$
      .mapTo(1)
      .withLatestFrom(props$, (dif, { multiplier }) => dif * multiplier),
    decrement$.mapTo(-1)
  )
    .startWith(0)
    .scan((count, n) => count + n, 0)

  return count$.map(count => ({
    count,
    increment,
    decrement,
  }))
})

const Counter2 = ({ count, increment, decrement }) =>
  console.log("counter2", count) || (
    <div>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )

const EnhancedCounter = enhance(Counter2)

export default class PropsStreamDemo extends Component {
  state = { multiplier: 1 }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({ multiplier: this.state.multiplier + 1 })
          }
        >
          Inc Multiplier
        </button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Counter multiplier={this.state.multiplier} />
        <EnhancedCounter multiplier={this.state.multiplier} />
      </div>
    )
  }
}
