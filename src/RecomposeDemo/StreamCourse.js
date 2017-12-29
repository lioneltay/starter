import React, { Component, cloneElement, Children } from "react"

import {
  componentFromStream,
  createEventHandler,
  mapPropsStream,
  compose,
} from "recompose"
import { Observable } from "rxjs"
import * as R from "ramda"

const count = mapPropsStream(props$ => {
  const { stream: onDec$, handler: onDec } = createEventHandler()
  const { stream: onInc$, handler: onInc } = createEventHandler()

  return props$.switchMap(
    props =>
      Observable.merge(onInc$.mapTo(1), onDec$.mapTo(-1))
        .startWith(0)
        .scan((a, v) => a + v),
    (props, count) => ({ ...props, count, onInc, onDec })
  )
})

const load = mapPropsStream(props$ =>
  props$.switchMap(
    props =>
      Observable.ajax(`https://swapi.co/api/people/${props.count}`)
        .pluck("response")
        .startWith({ name: "loading..." })
        .catch(err => Observable.of({ name: "Not found" })),
    (props, person) => ({ ...props, person })
  )
)

const personNameLens = R.lensPath(["person", "name"])

const typewriter = lens =>
  mapPropsStream(props$ => {
    return props$.switchMap(
      props =>
        Observable.zip(
          Observable.from(R.view(lens, props)),
          Observable.interval(100),
          letter => letter
        ).scan((a, v) => a + v),
      (props, name) => R.set(lens, name, props)
    )
  })

const Counter = props => (
  <div>
    <button onClick={props.onInc}>+</button>
    <button onClick={props.onDec}>-</button>
    <h3>{props.count}</h3>
    <h1>{props.person.name}</h1>
  </div>
)

const CounterWithPersonLoader = compose(
  count,
  load,
  typewriter(personNameLens)
)(Counter)

const App = props => (
  <div>
    <h1>what</h1>
    <CounterWithPersonLoader count={0} />
  </div>
)

class Demo extends Component {
  render() {
    return (
      <div>
        <App />
      </div>
    )
  }
}

export default Demo
