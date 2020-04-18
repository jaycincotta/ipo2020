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
              <p>
                Your ballot will be emailed to you. Your phone number may be used to contact you if needed for
                credentialing purposes.
              </p>
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
                <p className="todo">TODO: opt-in checkboxes</p>
                <p className="annotation">
                  <b>NOTE</b>: The security of your data is our top priority. We will never sell your data, spam you, or
                  use your data in any manner beyond the officiation of this election. All voter data and documents will
                  be deleted as soon as your vote has been verified and the election is concluded.
                </p>
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
