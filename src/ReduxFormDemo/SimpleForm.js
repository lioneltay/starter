import React, { Component } from "react"
import PropTypes from "prop-types"

import { Field, reduxForm } from "redux-form"
import { compose } from "ramda"

const SimpleForm = compose(
  reduxForm({
    form: "simpleForm",
    initialValues: {
      lastName: "HOC",
      firstName: "HOCFIRST",
    },
  })
)(({ handleSubmit, pristine, submitting, reset }) => (
  <form
    style={{ maxWidth: 500, margin: "auto" }}
    onSubmit={handleSubmit((values, dispatch, meta) =>
      console.log("values", values, "dispatch", dispatch, "meta", meta)
    )}
  >
    <div>
      <label>First Name</label>
      <div>
        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
      </div>
    </div>

    <div>
      <label>Last Name</label>
      <div>
        <Field
          name="lastName"
          component="input"
          type="text"
          placeholder="Last Name"
        />
      </div>
    </div>

    <div>
      <label>Email</label>
      <div>
        <Field name="email" component="input" type="text" placeholder="Email" />
      </div>
    </div>

    <div>
      <label>Sex</label>
      <div>
        <label>
          <Field name="sex" component="input" type="radio" value="female" />{" "}
          Female
        </label>
      </div>

      <div>
        <label>
          <Field name="sex" component="input" type="radio" value="female" />{" "}
          Female
        </label>
      </div>
    </div>

    <div>
      <label>Favorite Color</label>
      <div>
        <Field name="favoriteColor" component="select">
          <option />
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
      </div>
    </div>

    <div>
      <label htmlFor="employed">Employed</label>
      <div>
        <Field
          name="employed"
          id="employed"
          component="input"
          type="checkbox"
        />
      </div>
    </div>

    <div>
      <label>Notes</label>
      <div>
        <Field name="notes" component="textarea" />
      </div>
    </div>

    <div>
      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </button>
    </div>
  </form>
))

export default SimpleForm
