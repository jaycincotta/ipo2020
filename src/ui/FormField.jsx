import React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormField({
  name,
  className,
  autocomplete,
  required,
  caption,
  type,
  component,
  placeholder,
  errors,
  touched,
  tabIndex
}) {
  const calculatedClassName = `text-input ${errors[name] && touched[name] ? "error" : ""} ${className}`;
  return (
    <>
      <label htmlFor={name}>
        {caption}
        {required && <strong>*</strong>}
      </label>
      <ErrorMessage name={name} className="error" component="div" />
      <Field
        className={className}
        component={component || "input"}
        type={type || "text"}
        name={name}
        placeholder={placeholder}
        className={calculatedClassName}
        tabIndex={tabIndex}
        autoComplete={autocomplete}
      />
      <br />
    </>
  );
}
