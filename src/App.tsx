import * as React from "react"
import * as PropTypes from "prop-types"

import Counter from "components/Counter"
import Button from "components/Button.js"

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Counter />
        <Button />
      </div>
    )
  }
}
