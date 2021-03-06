import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import MyVoteURL from "../../MyVoteURL";

export default function EditName({ next, prev, formData, setFormData, findByName }) {
  console.log("EditName", formData);
  const [editing, setEditing] = useState(false);
  const [autoContinue, setAutoContinue] = useState(false);
  const myVoteURL = MyVoteURL(formData.firstName, formData.lastName, formData.birthDate);

  const dateRegExp = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const validations = {
    // firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    birthDate: Yup.string()
      .required("Date of birth is required")
      .matches(dateRegExp, "Please enter as mm/dd/yyyy")
      .test("ValidDate", "Invalid date", value => !isNaN(Date.parse(value)))
      .test("MinYear", "You must be at least 18 years old", value => Date.parse(value) < Date.parse("5/13/2002"))
      .test("MaxYear", "You must still be alive", value => Date.parse(value) > Date.parse("1/1/1900"))
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      validate={(values, props) => {
        console.log("validate", values);
        setEditing(true);
        setAutoContinue(false);
      }}
      initialValues={{
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate
      }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit", formData, values);
          setEditing(false);
          setFormData(prevState => {
            return {
              ...prevState,
              firstName: values.firstName,
              lastName: values.lastName,
              birthDate: values.birthDate,
              birthYear: `${new Date(values.birthDate).getFullYear()}`
            };
          });
          setAutoContinue(true);
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
        dirty,
        handleChange,
        handleBlur
        //handleSubmit,
        //handleReset,
      }) => {
        const validated =
          findByName.response &&
          findByName.response.length >= 1 &&
          formData.firstName.toUpperCase() === values.firstName.toUpperCase() &&
          formData.lastName.toUpperCase() === values.lastName.toUpperCase() &&
          formData.birthYear === new Date(values.birthDate).getFullYear().toString();
        const invalidated = !editing && findByName.response && findByName.response.length < 1;

        if (validated && autoContinue) {
          setTimeout(() => next(), 0);
        }

        return (
          <>
            <div className="bigContainerTitle">
              <h2>Enter Name and Birthdate</h2>
            </div>
            <div className="content">
              <p>Please enter your full first and last name, same as on your voter registration.</p>
              <Form>
                <FormField
                  name="firstName"
                  autocomplete="off"
                  required
                  caption="First Name"
                  placeholder="First name"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  name="lastName"
                  autocomplete="off"
                  required
                  caption="Last Name"
                  placeholder="Last name"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  name="birthDate"
                  required
                  caption="Date of Birth (mm/dd/yyyy)"
                  placeholder="Your birthday"
                  errors={errors}
                  touched={touched}
                />
                <div className="formSpacer" />
                {validated && <p className="valid">Name and date of birth validated.</p>}
                {findByName.isLoading && <p className="validating">Validating...</p>}
                {invalidated && (
                  <p className="invalid">
                    We couldn't find you in our list of eligible voters. Are you sure that you entered your name as
                    listed on your voter record? Are you sure you meet all the eligibility criteria?
                  </p>
                )}
                {!validated && !invalidated && !isSubmitting && !findByName.isLoading && (
                  <button type="submit">Validate</button>
                )}
                {validated && (
                  <button className="good" type="button" onClick={() => next()}>
                    Continue
                  </button>
                )}
                {invalidated && (
                  <>
                    <button type="button" onClick={() => window.open(myVoteURL, "MyVote")}>
                      Find My Voter Record
                    </button>

                    {/* <button type="button" onClick={() => next()}>
                      Yes, I'm sure
                    </button> */}
                  </>
                )}
                <button type="button" onClick={() => prev()}>
                  Go Back
                </button>
              </Form>
            </div>
          </>
        );
      }}
    </Formik>
  );

  return form;
}
