import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

/*
dataLoader Schema
  {
    dataLoader,
    waitForData = true,
    timeUntilStale = 60,
    defaultValue,
    refetchWhenStale = true,
  },
*/

const dataLoader = ({
  dataLoaders = [],
  storeKey = "reduxStateStore",
  propKey = "STIARAGI",
}) => Comp => {
  @connect(
    state => ({
      data: {
        name: {
          data: {},
          lastUpdate: 237489234,
        },
      },
    }),
    null,
    null,
    {
      storeKey: storeKey,
    }
  )
  class DataLoader extends Component {
    componentDidMount() {}
    render() {
      return <div />
    }
  }
}
