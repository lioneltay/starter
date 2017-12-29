import React, { Component, Children, cloneElement } from "react"
import PropTypes from "prop-types"
import * as R from "ramda"
import * as Re from "recompose"
import { createStore } from "redux"
import { connect } from "react-redux"
import { reduxState, reducer } from "lib/redux-state"

const injectChildProps = (children, injectProps) =>
  Children.map(children, (child, index) =>
    cloneElement(
      child,
      typeof injectProps === "function"
        ? injectProps(child, index)
        : injectProps
    )
  )

export const Tabs = R.compose(Re.withState("activeIndex", "setActiveIndex", 0))(
  ({ activeIndex, children, setActiveIndex }) => {
    return (
      <div className="tabs">
        {injectChildProps(children, {
          activeIndex,
          setActiveIndex: setActiveIndex,
        })}
      </div>
    )
  }
)

export const TabList = ({ activeIndex, children, setActiveIndex }) => (
  <div className="tablist">
    {injectChildProps(children, (child, index) => ({
      active: index === activeIndex,
      onSelect: () => setActiveIndex(index),
    }))}
  </div>
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

export const TabPanels = ({ activeIndex, children }) => (
  <div className="tabpanels">{children[activeIndex]}</div>
)

export const TabPanel = ({ children }) => (
  <div className="tabpanel">{children}</div>
)
