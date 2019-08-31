import "moment";
import React from "react";
// import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const DatePickerField = ({ field, form, ...other }) => {
  return (
    // <MuiPickersUtilsProvider utils={MomentUtils}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        name={field.name}
        value={field.value}
        disableFuture
        openTo="year"
        format="MMMM/dd/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        onChange={(date, value) => {
          const saveDate = !isNaN(date);
          form.setFieldValue(field.name, saveDate ? date : value, true);
        }}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerField;
