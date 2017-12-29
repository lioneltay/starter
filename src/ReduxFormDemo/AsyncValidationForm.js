import React from "react"
import { Field, reduxForm } from "redux-form"

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = "Required"
  }
  if (!values.password) {
    errors.password = "Required"
  }
  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    console.log("validatecomplete")
    if (["john", "paul", "george", "ringo"].includes(values.username)) {
      throw { username: "That username is taken" }
    }
  })
}

const renderField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div className={asyncValidating ? "async-validating" : ""}>
      <input {...input} type={type} placeholder={label} />
      {asyncValidating && "validating!!!"}
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const AsyncValidationForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    asyncValidating,
    asyncValidate,
  } = props
  return (
    <form
      onSubmit={handleSubmit(values =>
        sleep(2000).then(() => console.log(values))
      )}
    >
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <div>
        <button type="submit" disabled={submitting || asyncValidating}>
          Sign Up
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>

        <button type="button" onClick={asyncValidate}>
          ValidateAsync
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: "asyncValidation", // a unique identifier for this form
  getFormState: state => state.reduxForm,
  validate,
  asyncValidate,
  asyncBlurFields: ["username"],
  asyncChangeFields: [],
})(AsyncValidationForm)
