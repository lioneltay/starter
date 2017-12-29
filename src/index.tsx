import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "App"
import "styles/index.scss"

// import { createStore, combineReducers, applyMiddleware, compose } from "redux"
// import { Provider } from "react-redux"

// import { reducer as formReducer } from "redux-form"

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const middleware = []

// const reducer = combineReducers({
//   otherState: (state = { otherState: "otherValues" }) => state,
//   anything: (state, action) => action.anything || null,
//   reduxForm: formReducer,
// })

// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(...middleware))
// )

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // </Provider>,
  document.querySelector("#app")
)
