import React, { Children } from "react"
import PropTypes from "prop-types"
import { withState, withContext, getContext, withHandlers } from "recompose"
import { compose, propOr } from "ramda"

export const Tabs = compose(
  withState("activeKey", "setActiveKey", propOr(1, "initialTabKey")),
  withContext(
    {
      activeKey: PropTypes.number,
      setActiveKey: PropTypes.func,
    },
    ({ setActiveKey, activeKey }) => ({ setActiveKey, activeKey })
  )
)(({ children }) => Children.toArray(children))

export const Tab = compose(
  getContext({
    activeKey: PropTypes.number.isRequired,
    setActiveKey: PropTypes.func.isRequired,
  }),
  withHandlers({
    onSelect: ({ tabKey, setActiveKey }) => () => setActiveKey(tabKey),
  })
)(({ disabled, activeKey, tabKey, onSelect, children }) => (
  <div
    onClick={disabled ? null : onSelect}
    className={`
          tab ${disabled ? "disabled" : ""} ${
      activeKey === tabKey ? "active" : ""
    }`}
  >
    {children}
  </div>
))

export const TabPanel = compose(
  getContext({ activeKey: PropTypes.number.isRequired })
)(
  ({ children, activeKey, tabKey }) =>
    activeKey === tabKey ? <div className="tabpanel">{children}</div> : null
)
