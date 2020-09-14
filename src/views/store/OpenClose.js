import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {useInput} from "../../utils/common";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TimePickers({open, close}) {
  const classes = useStyles();

  return (
    <>
      <form className={classes.container} noValidate>
        <div style={{ margin: "10px" }}>
          <TextField
            id="open"
            label="Open"
            type="time"
            {...open}            
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
        <div
          style={{ margin: "10px", textAlign: "center", paddingTop: "15px" }}
        >
          ~
        </div>
        <div style={{ margin: "10px" }}>
          <TextField
            id="close"
            label="Close"
            type="time"
            {...close}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
      </form>
    </>
  );
}
