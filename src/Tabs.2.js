import React, { Component, Children, cloneElement } from "react"
import PropTypes from "prop-types"
import * as R from "ramda"
import * as Re from "recompose"
import { localStore, reduxState, reducer } from "lib/redux-state"

const injectChildProps = (children, injectProps) =>
  Children.toArray(
    Children.map(children, (child, index) =>
      cloneElement(
        child,
        typeof injectProps === "function"
          ? injectProps(child, index)
          : injectProps
      )
    )
  )

export const Tabs = R.compose(
  Re.withState("activeIndex", "setActiveIndex", 0),
  Re.withContext(
    {
      activeIndex: PropTypes.number,
      setActiveIndex: PropTypes.func,
    },
    ({ setActiveIndex, activeIndex }) => ({ setActiveIndex, activeIndex })
  )
)(({ children }) => {
  return <div className="tabs">{children}</div>
})

export const TabList = R.compose(
  Re.getContext({
    activeIndex: PropTypes.number.isRequired,
    setActiveIndex: PropTypes.func.isRequired,
  })
)(({ activeIndex, children, setActiveIndex }) =>
  injectChildProps(children, (child, index) => ({
    active: index === activeIndex,
    onSelect: () => setActiveIndex(index),
  }))
)

export const Tab = ({ disabled, active, onSelect, children }) => (
  <div
    onClick={disabled ? null : onSelect}
    className={`
          tab ${disabled ? "disabled" : ""} ${active ? "active" : ""}`}
  >
    {children}
  </div>
)

export const TabPanels = R.compose(
  Re.getContext({ activeIndex: PropTypes.number.isRequired })
)(({ activeIndex, children }) => children[activeIndex])

export const TabPanel = ({ children }) => (
  <div className="tabpanel">{children}</div>
)
