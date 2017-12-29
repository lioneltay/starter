import { createStore, applyMiddleware, combineReducers } from "redux"

import { combineForms, createForms } from "react-redux-form"

const initialUserState = {
  firstName: "moo",
  // lastName: "cowson",
}

const store = createStore(
  combineReducers({
    existing: state => state || ["existing state"],
    foo: state => state || "foooo",
    forms: combineForms(
      {
        cow: initialUserState,
      },
      "forms"
    ),
  })
)

export default store
