import React, { useState } from "react";
import { useField } from "../../hooks";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },

    display: "flex",
    flexWrap: "wrap",
  },
  fields: {
    zIndex: 10,
  },
}));

const TripForm = ({ submit, defaultValues }) => {
  const classes = useStyles();
  const { reset: resetDestination, ...destination } = useField(
    "text",
    defaultValues.destination
  );
  const [startDate, setStartDate] = useState(
    defaultValues.startDate || new Date()
  );
  const [endDate, setEndDate] = useState(defaultValues.endDate || new Date());
  const { reset: resetComment, ...comment } = useField(
    "text",
    defaultValues.comment
  );

  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    resetDestination(resetComment());
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const tripObject = {
      destination: destination.value,
      startDate: startDate,
      endDate: new Date().toISOString(),
      comment: comment.value,
      createdBy: 1,
    };
    submit(tripObject);
    handleReset();
  };

  // useEffect(() => {
  //   handleReset();
  // }, [handleReset]);

  return (
    <form
      className={classes.root}
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Destination" {...destination} />

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/DD/YYYY"
          margin="normal"
          id="start-date"
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/DD/YYYY"
          margin="normal"
          id="end-date"
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField id="outlined-basic" label="Comment" {...comment} />
      <Button type="submit" fullWidth variant="contained" color="secondary">
        Save Trip
      </Button>
    </form>
  );
};

export default TripForm;
