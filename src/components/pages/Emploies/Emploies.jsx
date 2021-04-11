import { Container, Paper, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useState } from "react";
import EmployForm from "./EmployForm";
import useTable from "../../useTable.js"
import * as employeeService from "../../../Services/EmployeeService.js"
import useStyles from "./styles.js";

const headCells = [
  { id: "fullName", label: "Employee name"},
  { id: "email", label: "Email address(personal)"},
  { id: "mobile", label: "Mobile Number"},
  { id: "department", label: "Department name"},
]

export default function Emploies() {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees())
  const { TblContainer, TblHead, TblPagination } = useTable(records, headCells)
  return (
    <>
      <Container>
        <Paper className={classes.pageContent} elevation={3}>
          <EmployForm />
          <TblContainer>
          <TblHead />
            <TableBody>
              {
                records.map((item) =>(
                  <TableRow key={item.id}>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item.department}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </Container>
    </>
  );
}
