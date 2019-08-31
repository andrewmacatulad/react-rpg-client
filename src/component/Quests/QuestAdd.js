import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Grid, FormControlLabel, Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField, RadioGroup } from "formik-material-ui";
import isEmpty from "../common/isEmpty";
import DatePickerField from "../common/FormikPickerMaterial";

import { addQuests } from "./questsAction";
import LoadingComponent from "../../app/layout/LoadingComponent";

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

const status = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" }
];

const questAddSchema = Yup.object().shape({
  questTitle: Yup.string().required(),
  questType: Yup.string().required(),
  questObjective: Yup.string()
});

class QuestAdd extends Component {
  render() {
    const { classes } = this.props;

    let questTitle = "";
    let questObjective = "";

    return (
      <Formik
        initialValues={{
          questTitle,
          questType: "daily",
          questObjective
        }}
        validationSchema={questAddSchema}
        onSubmit={(values, { setSubmitting }) => {
          //   if (isEmpty(profile.profile)) {
          //     this.props.setProfile(values);
          //     setSubmitting(false);
          //   } else {
          //     // this.props.updateProfile(values, this.props.history);
          //     console.log(values);
          //     setSubmitting(false);
          //   }

          console.log(values);
          this.props.addQuests(values, this.props.history);
          setSubmitting(false);
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
                    name="questTitle"
                    placeholder="Quest Title"
                    component={TextField}
                    label="Quest Title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="text"
                    name="questObjective"
                    placeholder="Quest Objective"
                    component={TextField}
                    label="Quest Objective"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Field name="birthday" component={DatePickerField} />
                </Grid> */}
                <Grid item xs={12}>
                  <Field name="questType" component={RadioGroup}>
                    {status &&
                      status.map(status => (
                        <FormControlLabel
                          key={status.value}
                          value={status.value}
                          control={<Radio />}
                          label={status.label}
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

export default withRouter(
  connect(
    null,
    { addQuests }
  )(withStyles(styles)(QuestAdd))
);
