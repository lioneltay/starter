import React from "react"
import ReactDOM from "react-dom"

import Root from "Root"
import "styles/styles.scss"

import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { Provider } from "react-redux"

import { reducer as formReducer } from "redux-form"
import { reducer as reduxStateReducer } from "lib/redux-state"
import { reducer as uiReducer, dynamicUIReducers } from "lib/redux-ui-tekk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = []

let id = 1
const ITEMS = [
  { id: id++, name: "Bob", email: "bob@gmail.com", gender: "m" },
  { id: id++, name: "Alice", email: "alice@gmail.com", gender: "f" },
  { id: id++, name: "James", email: "james@gmail.com", gender: "m" },
]
const itemsReducer = state => state || ITEMS

const reducer = combineReducers({
  otherState: (state = { otherState: "otherValues" }) => state,
  anything: (state, action) => action.anything || null,
  reduxForm: formReducer,
  reduxState: reduxStateReducer,
  ui: uiReducer,
  items: itemsReducer,
})

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelector("#app")
)
