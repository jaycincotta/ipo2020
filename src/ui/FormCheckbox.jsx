import React from "react";
import { Field } from "formik";

export default function FormCheckbox(props) {
  return (
    <>
      <Field name={props.name}>
        {({ field, form }) => (
          <label className="checkbox">
            <input
              {...field}
              type="checkbox"
              component="input"
              checked={field.value}
              onChange={() => {
                form.setFieldValue(field.name, !field.value);
                form.setFieldTouched(field.name, true);
              }}
            />
            <span>{props.caption}</span>
          </label>
        )}
      </Field>
    </>
  );
}
