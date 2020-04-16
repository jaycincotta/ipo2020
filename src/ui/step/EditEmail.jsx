import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";

export default function EditEmail({ next, formData, setFormData }) {
  console.log("EditEmail", formData);
  const phoneRegExp = /^(\+?(011[. -]?)?\+?52[. -]?([0-9]{3}[. -]?[0-9]{3}[. -]?[0-9]{4}|[0-9]{2}[. -]?[0-9]{4}[. -]?[0-9]{4})|(\+?(1[. -]?)?(\(?[0-9]{3}\)?[. -]?[0-9]{3}[. -]?[0-9]{4})))(\s?(x|ext|ext.)\s?[0-9]{1,5})?$/;

  const validations = {
    email: Yup.string().required("Email address is required").email("Invalid email"),
    phone: Yup.string().required("Phone number is required").matches(phoneRegExp, "Phone number is not valid")
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      initialValues={{ email: formData.email, phone: formData.phone }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
          setFormData({
            ...formData,
            email: values.email,
            phone: values.phone
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
          <>
            <div className="bigContainerTitle">
              <h2>Enter Contact Information</h2>
            </div>
            <div className="content">
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
                <FormField
                  name="phone"
                  required
                  caption="Phone Number"
                  placeholder="Phone"
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
          </>
        );
      }}
    </Formik>
  );

  return form;
}
