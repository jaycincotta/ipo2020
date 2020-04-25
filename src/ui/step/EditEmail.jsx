import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import FormCheckbox from "../FormCheckbox";

export default function EditEmail({ next, prev, formData, setFormData }) {
  console.log("EditEmail", formData);
  const phoneRegExp = /^(\+?(011[. -]?)?\+?52[. -]?([0-9]{3}[. -]?[0-9]{3}[. -]?[0-9]{4}|[0-9]{2}[. -]?[0-9]{4}[. -]?[0-9]{4})|(\+?(1[. -]?)?(\(?[0-9]{3}\)?[. -]?[0-9]{3}[. -]?[0-9]{4})))(\s?(x|ext|ext.)\s?[0-9]{1,5})?$/;

  const validations = {
    email: Yup.string().required("Email address is required").email("Invalid email"),
    phone: Yup.string().required("Phone number is required").matches(phoneRegExp, "Phone number is not valid")
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      initialValues={{
        email: formData.email,
        phone: formData.phone,
        ipoOptIn: formData.ipoOptIn,
        starOptIn: formData.starOptIn
      }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
          setFormData(prevState => {
            return {
              ...prevState,
              email: values.email,
              phone: values.phone,
              ipoOptIn: values.ipoOptIn,
              starOptIn: values.starOptIn
            };
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
                Your ballot will be emailed to you. Your phone number may be used to contact you, if needed for security
                purposes.
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
                <div className="formSpacer" />
                <FormCheckbox
                  name="ipoOptIn"
                  caption="Send me occasional updates from the Independent&nbsp;Party&nbsp;of&nbsp;Oregon"
                  errors={errors}
                  touched={touched}
                />
                <FormCheckbox
                  name="starOptIn"
                  caption="Send me occasional updates from STAR&nbsp;Voting"
                  errors={errors}
                  touched={touched}
                />
                {/* <p className="annotation">
                  <b>NOTE</b>: The security of your data is our top priority. We will never sell your data, spam you, or
                  use your data in any manner beyond the officiation of this election. All voter data and documents will
                  be deleted as soon as your vote has been verified and the election is concluded.
                </p> */}
                <button className="good" type="submit" disabled={isSubmitting}>
                  Continue
                </button>
                <button type="button" onClick={() => prev()}>
                  Go Back
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
