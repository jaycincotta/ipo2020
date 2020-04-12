import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useVoterData from "../hooks/useVoterData";
import useLocalStorage from "../hooks/useLocalStorage";
import FetchViewer from "./FetchViewer";

export default function Signup() {
  const [voter, setVoter] = useState({});
  const nameAvailable = voter.firstName && voter.lastName && voter.birthYear;
  const findByName = useVoterData("FindByName", voter, nameAvailable);
  const searchByName = useVoterData(
    "SearchByName",
    {
      firstName: voter.firstName ? voter.firstName.substr(0, 1) : "",
      lastName: voter.lastName,
      birthYear: voter.birthYear
    },
    nameAvailable
  );

  const initialValues = {
    firstName: "",
    lastName: "",
    birthYear: "",
    birthDate: "",
    address: "",
    city: "",
    zipcode: ""
  };
  const [formData, setFormData] = useLocalStorage("formData", initialValues);
  const validations = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    birthYear: Yup.string().required("Birth year is required")
  };
  const inputSchema = Yup.object().shape(validations);

  const FormField = ({ name, required, caption, type, component, placeholder, errors, touched, tabIndex }) => (
    <>
      <label htmlFor={name}>
        {caption}
        {required && <strong>*</strong>}
      </label>
      <ErrorMessage name={name} className="error" component="div" />
      <Field
        component={component || "input"}
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        className={errors[name] && touched[name] ? "text-input error" : "text-input"}
        tabIndex={tabIndex}
      />
      <br />
    </>
  );

  const form = (
    <Formik
      validate={(values, props) => {
        console.log("validate");
      }}
      initialValues={formData}
      validationSchema={inputSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Submit");
          setFormData(values);
          setVoter({ firstName: values.firstName, lastName: values.lastName, birthYear: values.birthYear });
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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <br />
              <FetchViewer name="FindByName" result={findByName} />
              <FetchViewer name="SearchByName" result={searchByName} />
            </Form>
          </div>
        );
      }}
    </Formik>
  );

  return form;
}
