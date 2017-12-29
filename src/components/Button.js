import * as React from "react"

export default class Button extends React.Component {
  render() {
    return (
      <div>
        <h1>button</h1>
        <button onClick={() => console.log("Button Clicked")}>Button</button>
      </div>
    )
  }
}
