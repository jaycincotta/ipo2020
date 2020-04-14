import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";

export default function EditAddress({ next, prev, formData, setFormData, findByName, findByAddress }) {
  console.log("EditAddress", formData);
  const [editing, setEditing] = useState(false);

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
      .min(97001)
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
          findByAddress.response.length === 1 &&
          formData.houseNum === values.houseNum &&
          formData.zipcode === values.zipcode &&
          findByName.response &&
          findByName.response.length === 1 &&
          findByName.response[0].VoterId === findByAddress.response[0].VoterId;

        const invalidated = !editing && findByAddress.response && findByAddress.response.length !== 1;

        return (
          <div>
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
              {validated && <p className="valid">Address validated.</p>}
              {findByAddress.isLoading && <p className="validating">Validating...</p>}
              {invalidated && <p className="invalid">Are you sure?</p>}
              {!validated && !invalidated && !isSubmitting && !findByAddress.isLoading && (
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
              &nbsp;&nbsp;&nbsp;
              <button type="button" onClick={() => prev()}>
                Go Back
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );

  return form;
}
