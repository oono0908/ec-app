import React from "react";
import TextField from "@material-ui/core/TextField"

const TextInput = (props) => {
  return (
    <div>
      <p fontWeight={props.fontWeight}>{props.title}</p>
    <TextField
    className={props.className}
    fullWidth={props.fullWidth}
    margin="dense"
    multiline={props.multiline}
    placeholder={props.placeholder}
    required={props.required}
    rows={props.rows}
    value={props.value}
    type={props.type}
    onChange={props.onChange}
    variant="outlined"
    label={props.label}
  />
  </div>
  )
}

export default TextInput