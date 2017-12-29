const HEAD = "@@ReduxState/"
const generateType = type => HEAD + type

export const SET_MODEL = generateType("SET_MODEL")
export const CLEAR_STATE = generateType("CLEAR_STATE")
