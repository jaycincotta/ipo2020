import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";

export default function EditEmail({ next, formData, setFormData }) {
  console.log("EditEmail", formData);
  const validations = {
    email: Yup.string().required("Email address is required").email("Invalid email")
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      initialValues={{ email: formData.email }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
          setFormData({
            ...formData,
            email: values.email
          });
          setTimeout(() => next(), 0);
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
        return (
          <div>
            <p>We require an email address to send you your ballot.</p>
            <Form>
              <FormField
                name="email"
                required
                caption="Email Address"
                placeholder="Email"
                errors={errors}
                touched={touched}
                setFieldTouched={setFieldTouched}
              />
              <button type="submit" disabled={isSubmitting}>
                Continue
              </button>
              <br />
            </Form>
          </div>
        );
      }}
    </Formik>
  );

  return form;
}
