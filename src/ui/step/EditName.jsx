import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";

export default function EditName({ next, formData, setFormData, findByName }) {
  console.log("EditName", formData);
  const [editing, setEditing] = useState(false);

  const validations = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    birthYear: Yup.string().required("Birth year is required")
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      validate={(values, props) => {
        console.log("validate", values);
        setEditing(true);
      }}
      initialValues={{ firstName: formData.firstName, lastName: formData.lastName, birthYear: formData.birthYear }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit", formData, values);
          setEditing(false);
          setFormData({
            ...formData,
            firstName: values.firstName,
            lastName: values.lastName,
            birthYear: values.birthYear
          });
        } catch (error) {
          console.log("Error", error);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        touched,
        errors,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        validateField,
        //dirty,
        handleChange,
        handleBlur
        //handleSubmit,
        //handleReset,
      }) => {
        const validated =
          findByName.response &&
          findByName.response.length === 1 &&
          formData.firstName.toUpperCase() === values.firstName.toUpperCase() &&
          formData.lastName.toUpperCase() === values.lastName.toUpperCase() &&
          formData.birthYear === values.birthYear;
        const invalidated = !editing && findByName.response && findByName.response.length !== 1;

        return (
          <div>
            <Form>
              <FormField
                name="firstName"
                required
                caption="First Name"
                placeholder="First name"
                errors={errors}
                touched={touched}
              />
              <FormField
                name="lastName"
                required
                caption="Last Name"
                placeholder="Last name"
                errors={errors}
                touched={touched}
              />
              <FormField
                name="birthYear"
                required
                caption="Birth Year"
                placeholder="Year you were born"
                errors={errors}
                touched={touched}
              />
              {findByName.isLoading && (
                <p>
                  <i>Verifying...</i>
                </p>
              )}
              {invalidated && <p class="error">Are you sure?</p>}
              {!validated && !invalidated && !isSubmitting && !findByName.isLoading && (
                <button type="submit">Validate</button>
              )}
              {validated && (
                <button type="button" onClick={() => next()}>
                  Continue
                </button>
              )}
              {invalidated && (
                <button type="button" onClick={() => next()}>
                  Yes, I'm sure
                </button>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );

  return form;
}
