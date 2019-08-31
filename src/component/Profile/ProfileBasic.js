import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  FormControl,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Chip,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField, RadioGroup } from "formik-material-ui";
import CustomSelect from "../common/FormikSelectMaterial";
import isEmpty from "../common/isEmpty";
import DatePickerField from "../common/FormikPickerMaterial";

import { setProfile, getProfile, updateProfile } from "./profileAction";

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

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Unspecified", value: "Unspecified" }
];

const profileBasicSchema = Yup.object().shape({
  name: Yup.string().required(),
  gender: Yup.string().required(),
  address: Yup.string(),
  birthday: Yup.string().required()
});

class ProfileBasic extends Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    const { classes, profile } = this.props;
    if (isEmpty(profile)) {
      return <h2>Loading</h2>;
    }

    let birthday = "";
    let name = "";
    let address = "";

    if (isEmpty(profile.profile)) {
      birthday = "01/01/1988";
      name = "";
      address = "";
    } else {
      birthday = profile.profile.birthday;
      name = profile.profile.name;
      address = profile.profile.address;
    }

    return (
      <Formik
        initialValues={{
          name,
          gender: "",
          address,
          birthday
        }}
        validationSchema={profileBasicSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isEmpty(profile.profile)) {
            this.props.setProfile(values);
            setSubmitting(false);
          } else {
            // this.props.updateProfile(values, this.props.history);
            console.log(values);
            setSubmitting(false);
          }
        }}
      >
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
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    component={TextField}
                    label="Full Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="address"
                    placeholder="Address"
                    component={TextField}
                    label="Address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field name="birthday" component={DatePickerField} />
                </Grid>
                <Grid item xs={12}>
                  <Field name="gender" component={RadioGroup}>
                    {genders &&
                      genders.map(gender => (
                        <FormControlLabel
                          key={gender.value}
                          value={gender.value}
                          control={<Radio />}
                          label={gender.label}
                        />
                      ))}
                  </Field>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit Form
                </Button>
              </Grid>
              {/* {errors && isEmpty(errors) ? (
                <div />
              ) : (
                <Button color="primary" variant="contained">
                  Errors
                </Button>
              )} */}
            </Form>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.profile };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setProfile, getProfile, updateProfile }
  )(withStyles(styles)(ProfileBasic))
);
