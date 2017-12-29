import * as R from "ramda"
import { SET_MODEL, CLEAR_STATE } from "./actions"

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MODEL: {
      const { stateKey, model } = action
      if (typeof model !== "object") {
        throw new Error(`Model must be an object ${[typeof model]}`)
      }
      return R.assoc(stateKey, R.merge(state[stateKey], model), state)
    }
    case CLEAR_STATE: {
      const { stateKey } = action
      const newState = { ...state }
      delete newState[stateKey]
      return newState
    }
    default: {
      return state
    }
  }
}

export default reducer
