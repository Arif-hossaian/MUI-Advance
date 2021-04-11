import React from 'react'
import { TextField } from "@material-ui/core"
import useStyles from "./styles"
export default function Input(props) {
    const classes = useStyles()
    const { name, label, value, error = null, onChange } = props
    return (
        <>
          <TextField
              variant="outlined"
              label={label}
              className={classes.FullName}
              name={name}
              value={value}
              onChange={onChange}
              {...(error && {error: true, helperText: error})}
            />  
        </>
    )
}
