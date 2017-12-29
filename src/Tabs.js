import React, { Children } from "react"
import { StateProvider, ConnectedState } from "lib/redux-state"

export const Tabs = ({ children }) => (
  <StateProvider initialState={{ activeKey: 0 }}>
    {Children.toArray(children)}
  </StateProvider>
)

export const Tab = ({ tabKey, disabled, children }) => (
  <ConnectedState>
    {({ activeKey, setModel }) => (
      <div
        onClick={disabled ? null : () => setModel({ activeKey: tabKey })}
        className={`
          tab ${disabled ? "disabled" : ""} ${
          activeKey === tabKey ? "active" : ""
        }`}
      >
        {children}
      </div>
    )}
  </ConnectedState>
)

export const TabPanel = ({ children, tabKey }) => (
  <ConnectedState>
    {({ activeKey }) =>
      activeKey === tabKey ? <div className="tabpanel">{children}</div> : null
    }
  </ConnectedState>
)
