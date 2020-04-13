import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FetchViewer from "../FetchViewer";
import FormField from "../FormField";

function VerifyVoterInfo({ firstName, lastName, birthYear }) {
  const baseUrl = "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do?lang=eng&source=SOS";
  const parameters = `&identifier2=${firstName}&identifier3=${lastName}&identifier8=${birthYear}`;
  const url = baseUrl + parameters;
  window.open(url, "myvote");
}

export default function EditAddress({ next, formData, setFormData, findByAddress, searchByAddress }) {
  console.log("EditAddress", formData);
  const validations = {
    houseNum: Yup.string().required("House number is required"),
    zipcode: Yup.string().required("Zipcode is required")
  };
  const inputSchema = Yup.object().shape(validations);

  const form = (
    <Formik
      validate={(values, props) => {
        console.log("validate", values);
      }}
      initialValues={formData}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" disabled={isSubmitting} onClick={() => VerifyVoterInfo(values)}>
                Verify Voter Info
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" disabled={isSubmitting} onClick={() => next()}>
                Continue
              </button>
              <br />
              <FetchViewer name="FindByAddress" result={findByAddress} />
              <FetchViewer name="SearchByAddress" result={searchByAddress} />
            </Form>
          </div>
        );
      }}
    </Formik>
  );

  return form;
}
