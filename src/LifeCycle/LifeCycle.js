import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const hoc = () => Comp => {
  return class Hoc extends Component {
    render() {
      return (
        <LifeCycleMethods name="HOC">
          <Comp {...this.props} />
        </LifeCycleMethods>
      )
    }
  }
}

const shouldRender = shouldRender => Comp => props =>
  shouldRender(props) ? <Comp {...props} /> : null

@connect(state => ({
  anything: state.anything,
}))
class LifeCycleMethods extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor", this.props.name)
  }

  componentWillMount = () => {
    console.log("componentWillMount", this.props.name)

    this.props.dispatch({ type: "adjflks", anything: "tree" })
  }

  componentDidMount = () => {
    console.log("componentDidMount", this.props.name)
  }

  componentWillReceiveProps = () => {
    console.log("componentWillReceiveProps", this.props.name)
  }

  componentWillUpdate = () => {
    console.log("componentWillUpdate", this.props.name)
  }

  componentDidUpdate = () => {
    console.log("componentDidUpdate", this.props.name)
  }

  componentWillUnmount = () => {
    console.log("componentWillUnmount", this.props.name)
  }

  componentDidCatch = (error, errorInfo) => {
    console.log("componentDidCatch", this.props.name)
  }
  // shouldComponentUpdate = () => { console.log('shouldComponentUpdate'); return false; };

  render = () => {
    console.log("render", this.props.name)
    console.log("===========")
    console.log(JSON.stringify(this.props.anything, null, 2))
    console.log("===========")

    return (
      <div>
        <h1>{this.props.text}</h1>
        <code>
          <pre>{JSON.stringify(this.props.anything, null, 2)}</pre>
        </code>
        {this.props.children}
      </div>
    )
  }
}

const RenderedComponent = hoc()(LifeCycleMethods)

export default class LifeCycleDemo extends Component {
  render() {
    return (
      <div>
        <div>
          <LifeCycleMethods text="hello" name="CHILD" />
        </div>
      </div>
    )
  }
}
