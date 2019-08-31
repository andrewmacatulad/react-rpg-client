// import "moment";
// import React, { Component } from "react";
// import { Container, Paper, Typography, Grid } from "@material-ui/core";
// // import DateFnsUtils from "@date-io/date-fns";
// import MomentUtils from "@date-io/moment";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from "@material-ui/pickers";

// export default function ProfileAbout() {
//   const [selectedDate, setSelectedDate] = React.useState(
//     new Date("2014-08-18T21:11:54")
//   );
//   function handleDateChange(date) {
//     setSelectedDate(date);
//     console.log(setSelectedDate(date));
//   }

//   return (
//     <Container>
//       <Paper>
//         <Typography variant="h1">About</Typography>

//         <MuiPickersUtilsProvider utils={MomentUtils}>
//           <Grid container justify="space-around">
//             <KeyboardDatePicker
//               margin="normal"
//               id="mui-pickers-date"
//               label="Date picker"
//               value={selectedDate}
//               onChange={handleDateChange}
//               KeyboardButtonProps={{
//                 "aria-label": "change date"
//               }}
//             />
//             {/* <KeyboardTimePicker
//               margin="normal"
//               id="mui-pickers-time"
//               label="Time picker"
//               value={selectedDate}
//               onChange={handleDateChange}
//               KeyboardButtonProps={{
//                 "aria-label": "change time"
//               }}
//             /> */}
//           </Grid>
//         </MuiPickersUtilsProvider>
//       </Paper>
//     </Container>
//   );
// }

import "moment";
import moment from "moment";
import moments from "moment-timezone";
import React from "react";
import MomentUtils from "@date-io/moment";
import { Grid, Paper } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import isEmpty from "../common/isEmpty";

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  // if (!isEmpty(form.errors.date)) {
  //   console.log(form.errors.date._d);
  //   console.log(currentError._d);
  // }
  // console.log(currentError._d);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      /> */}
      <DatePicker
        name={field.name}
        value={field.value}
        // mask="__/__/____"
        // format="DD/MM/YYYY"
        // helperText={currentError}
        // error={Boolean(currentError)}
        disableFuture
        openTo="year"
        // format="DD/MM/YYYY"
        format="LL"
        label="Date of birth"
        views={["year", "month", "date"]}
        onChange={(date, value) => {
          console.log(date);
          const saveDate = !isNaN(date);
          //    form.setFieldTouched(field.name, true, false);
          form.setFieldValue(field.name, saveDate ? date : value, true);
        }}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const FormikExample = () => {
  return (
    <Formik
      initialValues={{ date: new Date() }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(moment.locale());
        console.log(values.date);
        console.log(moment(values.date._d).format());
        console.log(values);
        console.log(values.date._d);
        console.log(moment(values.date._d).fromNow());
        console.log(moment().utcOffset());
        console.log(moment().diff(values.date._d, "years"));
      }}
    >
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid item container justify="center" xs={12}>
              <Field name="date" component={DatePickerField} />
            </Grid>

            {/* <Grid item xs={12} sm={12} style={{ margin: "24px" }}>
              <Paper>{JSON.stringify({ errors, values }, null, 2)}</Paper>
            </Grid> */}
          </Grid>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikExample;
