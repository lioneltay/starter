import React, { Component } from "react"
import PropTypes from "prop-types"

import { Observable, Scheduler } from "rxjs"

// export default class RxJSAnimation extends Component {
//   componentDidMount() {
//     const balls = document.querySelectorAll(".ball")

//     const msElapsed = (scheduler = Scheduler.animationFrame) => {
//       const start = Date.now()
//       return Observable.defer(() =>
//         Observable.interval(0, scheduler).map(() => Date.now() - start)
//       )
//     }

//     const duration = (ms, scheduler = Scheduler.animationFrame) =>
//       msElapsed(scheduler)
//         .map(ems => ems / ms)
//         .takeWhile(t => t <= 1)
//         .concat(Observable.of(1))

//     const distance = d => t => t * d

//     const moveDown = el => duration$ =>
//       duration$
//         .map(x => x * x * x * x)
//         .map(distance(400))
//         .do(pixels => {
//           el.style.transform = `translate(0, ${pixels}px)`
//         })

//     Observable.from(balls)
//       .mergeMap((ball, i) => duration(500 * (i + 1)).let(moveDown(ball)))
//       .subscribe()
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => console.log("click")}>Click</button>

//         <div style={{ display: "flex" }}>
//           <div ref={el => (this.ball = el)} className="ball" />
//           <div ref={el => (this.ball = el)} className="ball" />
//           <div ref={el => (this.ball = el)} className="ball" />
//           <div ref={el => (this.ball = el)} className="ball" />
//         </div>
//       </div>
//     )
//   }
// }

// export default class RxJSAnimation extends Component {
//   componentDidMount() {
//     const hand = document.querySelector(".clock-hand")

//     const msElapsed = (scheduler = Scheduler.animationFrame) => {
//       const start = Date.now()
//       return Observable.defer(() =>
//         Observable.interval(0, scheduler).map(() => Date.now() - start)
//       )
//     }

//     const duration = (ms, scheduler = Scheduler.animationFrame) =>
//       msElapsed(scheduler)
//         .map(ems => ems / ms)
//         .takeWhile(t => t <= 1)
//         .concat(Observable.of(1))

//     const distance = d => t => t * d

//     const prevAndCurrent = initialValue => source$ =>
//       source$.startWith(initialValue).bufferCount(2, 1)

//     const tween = (ms, easing = x => x) => source$ =>
//       source$.let(prevAndCurrent(0)).switchMap(([p, n]) =>
//         duration(ms)
//           .map(easing)
//           .map(distance(n - p))
//           .map(v => p + v)
//       )

//     Observable.timer(0, 1000)
//       .map(t => t * 360 / 60)
//       .let(tween(1000, x => Math.pow(x, 4)))
//       .subscribe(dist => {
//         hand.style.transform = `rotate(${dist}deg)`
//       })
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => console.log("click")}>Click</button>

//         <div style={{ padding: 100 }}>
//           <div className="clock-hand" />
//         </div>
//       </div>
//     )
//   }
// }

export default class RxJSAnimation extends Component {
  componentDidMount() {
    const hand = document.querySelector(".clock-hand")

    const msElaspsed = (scheduler = Scheduler.animationFrame) => {
      const start = Date.now()
      return Observable.interval(0, scheduler).map(() => Date.now() - start)
    }

    const duration = ms =>
      msElaspsed(ms)
        .map(ems => ems / ms)
        .takeWhile(p => p <= 1)
        .concat(Observable.of(1))

    const distance = d => p => d * p

    const prevAndCurrent = (initialValue, source$) =>
      source$.startWith(initialValue).bufferCount(2, 1)

    const tween = (ms, easing = x => x) => source$ => {
      return prevAndCurrent(0, source$).switchMap(([p, n]) => {
        return duration(ms)
          .map(easing)
          .map(distance(n - p))
          .map(x => p + x)
      })
    }

    Observable.timer(0, 1000)
      .map(t => t * 360 / 6)
      .let(tween(1000))
      .subscribe(dist => {
        hand.style.transform = `rotate(${dist}deg)`
      })
  }

  render() {
    return (
      <div>
        <button onClick={() => console.log("click")}>Click</button>

        <div style={{ padding: 100 }}>
          <div className="clock-hand" />
        </div>
      </div>
    )
  }
}
