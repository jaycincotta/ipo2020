import React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormField({
  name,
  required,
  caption,
  type,
  component,
  placeholder,
  errors,
  touched,
  tabIndex
}) {
  return (
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
}
