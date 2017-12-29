import React, { Component } from "react"
import PropTypes from "prop-types"

const Switch = ({ on, ...rest }) => (
  <div {...rest} className={`switch ${on ? "switch-on" : "switch-off"}`}>
    <div className={`circle ${on ? "circle-on" : "circle-off"}`} />
  </div>
)

const TOGGLE_CONTEXT = "__TOGGLE__"

const ToggleOn = withToggle(({ on, children }) => {
  return on ? children : null
})

const ToggleOff = withToggle(({ on, children }) => {
  return !on ? children : null
})

const ToggleButton = withToggle(({ on, toggle, ...rest }) => {
  return <Switch on={on} onClick={toggle} {...rest} />
})

class Toggle extends Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton

  static defaultProps = {
    onToggle: () => {},
  }

  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  state = { on: false }

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        toggle: this.toggle,
        on: this.state.on,
      },
    }
  }

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )

  render() {
    return <div>{this.props.children}</div>
  }
}

function withToggle(Comp) {
  function Wrapper(props, context) {
    const { on, toggle } = context[TOGGLE_CONTEXT]
    return <Comp on={on} toggle={toggle} {...props} />
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }

  return Wrapper
}

const MyToggle = withToggle(({ on, toggle }) => (
  <button onClick={toggle}>{on ? "on" : "off"}</button>
))

export default class AdvancedReactPatterns extends Component {
  render() {
    return (
      <div>
        <Toggle onToggle={on => console.log("toggle", on)}>
          <Toggle.On>The button is on</Toggle.On>
          <Toggle.Off>The button is off</Toggle.Off>
          <Toggle.Button />
          <hr />
          <MyToggle />
        </Toggle>
      </div>
    )
  }
}
