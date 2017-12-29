import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { path } from "ramda"
import JSONViewer from "react-json-view"

@connect(state => ({ state }))
export default class StateViewer extends Component {
  static propTypes = {
    state: PropTypes.object,
    statePath: PropTypes.any,
  }

  state = {
    showDialog: false,
    statePath: this.props.statePath,
    data: this.props.state,
  }

  componentDidMount() {
    this.listener = document.addEventListener("keydown", event => {
      console.log(event)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "E"
      ) {
        this.setState({ showDialog: !this.state.showDialog })
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.listener)
  }

  onChange = e => this.doUpdate(e.target.value)

  doUpdate = statePath => {
    const pathArray = statePath.split(/[.\[\]]/).filter(x => x)
    // console.log(pathArray)

    const data = path(pathArray, this.props.state) || this.state.data
    this.setState({ statePath, data })
  }

  moveCaretToEnd = () => {
    const statePath = this.state.statePath
    this.setState({ statePath: "" }, () => this.doUpdate(statePath))
  }

  renderDialog() {
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(210,210,210,0.9)",
          zIndex: 1900,
        }}
      >
        <input
          autoFocus
          onFocus={this.moveCaretToEnd}
          style={{ marginBottom: 25, minWidth: 350 }}
          value={this.state.statePath}
          onChange={this.onChange}
        />
        <div
          style={{
            margin: "auto",
            overflow: "auto",
            maxHeight: "70vh",
            maxWidth: "90vw",
            border: "1px solid rgb(255,180,180)",
            padding: 5,
          }}
        >
          <JSONViewer theme="rjv-grey" src={this.state.data} />
        </div>
      </div>
    )
  }

  render() {
    return this.state.showDialog ? this.renderDialog() : null
  }
}
