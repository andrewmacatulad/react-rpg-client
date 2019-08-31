import React, { Component } from "react";
import {
  Paper,
  Container,
  Typography,
  FormControl,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Chip
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Select } from "formik-material-ui";
import CustomSelect from "../common/FormikSelectMaterial";
import isEmpty from "../common/isEmpty";
import countryList from "../common/countryList";
import DatePickerField from "../common/FormikPickerMaterial";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: "flex",
    // flexDirection: "column",
    alignItems: "center"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: theme.spacing(3)
  }
});

const AttributesSchema = Yup.object().shape({
  strength: Yup.number()
    .required()
    // .positive()
    .integer(),
  vitality: Yup.number()
    // .positive()
    .integer(),
  intelligence: Yup.number()
    .required()
    // .positive()
    .integer(),
  spirit: Yup.number()
    // .positive()
    .integer(),
  luck: Yup.number()
    // .positive()
    .integer(),
  multiLanguages: Yup.array().required(),
  tags: Yup.array().required()
});

const ranges = [
  {
    value: "none",
    label: "None"
  },
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];

const countries = countryList.map(country => ({
  value: country.code,
  label: country.name
}));

class FormTest extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Formik
        initialValues={{
          strength: "",
          vitality: 0,
          intelligence: "",
          spirit: 0,
          luck: 0,
          tags: [],
          select: "none",
          multiLanguages: [],
          date: "02/03/1988"
        }}
        validationSchema={AttributesSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {/* <form className={classes.form} noValidate> */}
        {({
          errors,
          handleBlur,
          handleChange,
          touched,
          dirty,
          isSubmitting,
          values
        }) => {
          return (
            <Form className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="strength"
                    placeholder="Strength"
                    component={TextField}
                    label="Strength"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="strength"
                    placeholder="Strength"
                    component={TextField}
                    label="Strength"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="intelligence"
                    placeholder="Intelligence"
                    component={TextField}
                    label="Intelligence"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />

                  {/* <ErrorMessage name="intelligence" component="div" /> */}
                </Grid>
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Set Attributes {this.state.count}
                </Button> */}
                <Grid item xs={12}>
                  <Field
                    type="text"
                    name="select"
                    label="With Select"
                    select
                    helperText="Please select Range"
                    margin="normal"
                    component={TextField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {ranges.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel shrink={true} htmlFor="tags">
                      Tags
                    </InputLabel>
                    <Field
                      name="tags"
                      component={Select}
                      multiple={true}
                      inputProps={{ name: "tags", id: "tags" }}
                      renderValue={selected => (
                        <div>
                          {selected.map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                    >
                      <MenuItem value="Dogs">Dogs</MenuItem>
                      <MenuItem value="Cats">Cats</MenuItem>
                      <MenuItem value="Rats">Rats</MenuItem>
                      <MenuItem value="Snakes">Snakes</MenuItem>
                      {/* {ranges.map(option => (
                      <Chip key={option.value} label={option.value} />
                      // <MenuItem key={option.value} value={option.value}>
                      //   {option.label}
                      // </MenuItem>
                    ))} */}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {/* <Field
                    name="tags"
                    component={CustomSelect}
                    multiple={true}
                    inputProps={{ name: "tags", id: "tags" }}
                    renderValue={selected => (
                      <div>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                  </Field> */}

                  <Field
                    className="custom-select"
                    name="multiLanguages"
                    options={countries}
                    component={CustomSelect}
                    placeholder="Select multi countries"
                    isMulti={true}
                  />
                  {/* {errors && isEmpty(errors) ? (
                  <div />
                ) : (
                  <Button color="primary" variant="contained">
                    <ErrorMessage name="multiLanguages" />
                  </Button>
                )} */}
                </Grid>

                {errors && isEmpty(errors) ? (
                  <div />
                ) : (
                  <Button color="primary" variant="contained">
                    Errors
                  </Button>
                )}
                <Grid item xs={12}>
                  <Field name="date" component={DatePickerField} />
                </Grid>
              </Grid>

              <button disabled={!dirty || isSubmitting}>Reset</button>
              <button type="submit" disabled={isSubmitting}>
                Submit Form
              </button>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default withStyles(styles)(FormTest);
