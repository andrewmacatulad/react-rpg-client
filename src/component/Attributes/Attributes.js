import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { TextField } from "formik-material-ui";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";

import { setAttributes, getAttributes } from "./attributesAction";
import { Typography, FormControl } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
  },
  buttonAdd: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  buttonMinus: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

const AttributesSchema = Yup.object().shape({
  strength: Yup.number()
    // .positive()
    .integer(),
  vitality: Yup.number()
    // .positive()
    .integer(),
  intelligence: Yup.number()
    // .positive()
    .integer(),
  spirit: Yup.number()
    // .positive()
    .integer(),
  luck: Yup.number()
    // .positive()
    .integer()
});

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = { remainingStat: 100, strength: 0, count: 1 };
  }

  componentDidMount() {
    this.props.getAttributes();
  }
  addStat(values) {
    const { remainingStat, strength } = this.state;
    // console.log(values);
    // if (remainingStat > 0) {
    //   // this.setState({ strength: 1 });
    //   this.setState(prevState => {
    //     return { strength: prevState.strength - 1 };
    //   });
    // }
    this.setState({ strength: values.strength + 1 });
    console.log(values.strength);
    console.log(strength);
  }
  // handleTest() {
  //   console.log("Test");
  // }
  // constructor(props) {
  //   super(props);
  //   this.handleTest = this.handleTest.bind(this);
  // }

  onCheck = type => {
    this.setState(prevState => {
      return {
        count: type === "add" ? prevState.count + 1 : prevState.count - 1
      };
    });
  };

  render() {
    const { classes, attributes } = this.props;
    const { remainingStat, strength, count } = this.state;

    console.log("Attributes", attributes.stats);
    return (
      <div>
        <Formik
          initialValues={{
            strength: this.state.count,
            vitality: 0,
            intelligence: 0,
            spirit: 0,
            luck: 0
          }}
          validationSchema={AttributesSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.props.setAttributes(values);
          }}
        >
          {/* <form className={classes.form} noValidate> */}
          {({ errors, touched, isSubmitting, values }) => (
            <Form className={classes.form}>
              <FormControl>
                <Field
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="text"
                  name="strength"
                  placeholder="Strength"
                  component={TextField}
                  label="Strength"
                  disabled
                />
                {/* <Button variant="contained" color="primary">
                  Test
                </Button> */}
                <ErrorMessage name="strength" component="div" />
              </FormControl>
              <FormControl>
                <Button
                  className={classes.button}
                  margin="normal"
                  variant="contained"
                  color="primary"
                >
                  Test
                </Button>
              </FormControl>
              <FormControl>
                {/* <Button
                  className={classes.button}
                  margin="normal"
                  variant="contained"
                  color="primary"
                >
                  Test
                </Button> */}
                <Fab
                  color="primary"
                  aria-label="Add"
                  className={classes.buttonAdd}
                  // onClick={this.handleTest()}
                >
                  <AddIcon />
                </Fab>
              </FormControl>
              <FormControl>
                {/* <Button
                  className={classes.button}
                  margin="normal"
                  variant="contained"
                  color="primary"
                >
                  Test
                </Button> */}
                <Fab
                  // onClick={this.addStat(values)}
                  color="primary"
                  aria-label="Add"
                  className={classes.buttonMinus}
                >
                  <MinusIcon />
                </Fab>
              </FormControl>
              <div>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="vitality"
                  placeholder="Vitality"
                  component={TextField}
                  label="Vitality"
                  autoFocus
                />
                <ErrorMessage name="vitality" component="div" />
              </div>
              <div>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="intelligence"
                  placeholder="Intelligence"
                  component={TextField}
                  label="Intelligence"
                  autoFocus
                />
                <ErrorMessage name="intelligence" component="div" />
              </div>
              <div>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="spirit"
                  placeholder="Spirit"
                  component={TextField}
                  label="Spirit"
                  autoFocus
                />
                <ErrorMessage name="spirit" component="div" />
              </div>
              <div>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  name="luck"
                  placeholder="Luck"
                  component={TextField}
                  label="Luck"
                  autoFocus
                />
                <ErrorMessage name="luck" component="div" />
              </div>
              <div>
                <Typography variant="h2">
                  Stats remaining {remainingStat}
                </Typography>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Set Attributes {this.state.count}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return { attributes: state.attributes };
};
export default connect(
  mapStateToProps,
  { setAttributes, getAttributes }
)(withStyles(styles)(withRouter(Attributes)));
