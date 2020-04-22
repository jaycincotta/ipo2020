import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import MyVoteURL from "../../MyVoteURL";

export default function EditAddress({ next, prev, formData, setFormData, findByName, findByAddress }) {
  console.log("EditAddress", formData);
  const [editing, setEditing] = useState(false);
  const myVoteURL = MyVoteURL(formData.firstName, formData.lastName, formData.birthDate);

  const validations = {
    houseNum: Yup.number()
      .typeError("House number must be a... number")
      .required("House number is required")
      .integer()
      .min(1)
      .max(99999),
    zipcode: Yup.number()
      .typeError("Please enter your zipcode")
      .required("Zipcode is required")
      .integer()
      .min(89421)
      .max(97920)
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      validate={(values, props) => {
        console.log("validate", values);
        setEditing(true);
      }}
      initialValues={{ houseNum: formData.houseNum, zipcode: formData.zipcode }}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
          setEditing(false);
          setFormData({
            ...formData,
            houseNum: values.houseNum,
            zipcode: values.zipcode
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
          findByAddress.response &&
          findByAddress.response.length >= 1 &&
          formData.houseNum === values.houseNum &&
          formData.zipcode === values.zipcode &&
          findByName.response &&
          findByName.response.length >= 1 &&
          findByAddress.response.filter(a => findByName.response.some(n => a.VoterId === n.VoterId)).length >= 1;

        const invalidated = !editing && findByAddress.response && findByAddress.response.length < 1;

        if (editing && validated) next();

        return (
          <>
            <div className="bigContainerTitle">
              <h2>Enter Address</h2>
            </div>
            <div className="content">
              <Form>
                <FormField
                  name="houseNum"
                  required
                  caption="House Number"
                  placeholder="House Number"
                  errors={errors}
                  touched={touched}
                />
                <FormField
                  name="zipcode"
                  required
                  caption="Zipcode"
                  placeholder="Zipcode"
                  errors={errors}
                  touched={touched}
                />
                <div className="formSpacer" />
                {validated && <p className="valid">Address validated.</p>}
                {findByAddress.isLoading && <p className="validating">Validating...</p>}
                {invalidated && (
                  <p className="invalid">
                    Are you sure, {formData.firstName}? Our voter records show you living at a different address.
                  </p>
                )}
                {!validated && !invalidated && !isSubmitting && !findByAddress.isLoading && (
                  <button type="submit">Validate</button>
                )}
                {validated && (
                  <button type="button" onClick={() => next()}>
                    Continue
                  </button>
                )}
                {invalidated && (
                  <>
                    <button type="button" onClick={() => window.open(myVoteURL, "MyVote")}>
                      Find My Voter Record
                    </button>
                    <button type="button" onClick={() => window.open("http://support.ipo.vote")}>
                      Contact Voter Support
                    </button>
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
