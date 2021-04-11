import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Controls from "../../controls/Controls.js";
import { useForm, Form } from "../../useForm.js";
// import useStyles from "./styles.js";
import * as employeeService from "../../../Services/EmployeeService.js";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "others", title: "Others" },
];
const initialValue = {
  id: "0",
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  depertmentId: "",
  hireDate: new Date(),
  isParmanent: false,
};
export default function EmployForm() {
  // const classes = useStyles();
  const validation = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 10 ? "" : "Minimum 11 numbers required";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This field is required";
    if ("depertmentId" in fieldValues)
      temp.depertmentId =
        fieldValues.depertmentId.length !== 0 ? "" : "This field is required";
    setErrors({
      ...temp,
    });
    // eslint-disable-next-line eqeqeq
    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "");
    }
    //this return function returns to the validation that whenever the fullName,email,mobile,departmentid field is empty this function returns true and dont show error msg that the fields are emtpy plz field.
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialValue, true, validation);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()){
      employeeService.insertEmployee(values)
      resetForm()
    };
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Controls.Input
              label="Full name"
              name="fullName"
              value={values.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <Controls.Input
              label="Enter email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Enter Phone"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
            <Controls.Input
              label="Enter City name"
              name="city"
              value={values.city}
              onChange={handleInputChange}
              error={errors.city}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.RadioGroup
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
            />
            <Controls.Select
              name="depertmentId"
              label="Department"
              value={values.depertmentId}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
              error={errors.depertmentId}
            />
            <Controls.DatePicker
              label="Hire Date"
              name="hireDate"
              value={values.hireDate}
              onChange={handleInputChange}
            />
            <Controls.CheckBox
              label="Parmanent Employee"
              name="isParmanent"
              value={values.isParmanent}
              onChange={handleInputChange}
            />
            <div>
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
