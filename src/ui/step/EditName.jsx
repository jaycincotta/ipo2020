import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useVoterData from "../../hooks/useVoterData";
import useLocalStorage from "../../hooks/useLocalStorage";
import FetchViewer from "../FetchViewer";
import FormField from "../FormField";

function VerifyVoterInfo({ firstName, lastName, birthYear }) {
  const baseUrl = "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do?lang=eng&source=SOS";
  const parameters = `&identifier2=${firstName}&identifier3=${lastName}&identifier8=${birthYear}`;
  const url = baseUrl + parameters;
  window.open(url, "myvote");
}

export default function EditName({ next }) {
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
                Check IPO Voter File
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" disabled={isSubmitting} onClick={() => VerifyVoterInfo(values)}>
                Verify Voter Info on OreStar My Vote
              </button>
              &nbsp;&nbsp;&nbsp;
              <button type="button" disabled={isSubmitting} onClick={() => next()}>
                Continue
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
