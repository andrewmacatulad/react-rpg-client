import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import { TextField } from "formik-material-ui";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Icon } from "@material-ui/core";
import clsx from "clsx";

import { loginUser, getUser, signupUser } from "./signInAction";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  icon: {
    margin: theme.spacing(2)
  },
  buttonFb: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
    // backgroundColor: 'theme.palette.secondary.main'
  },
  buttonTwitter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#38A1F3"
  },
  buttonGoogle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    // backgroundColor: "#d44638"
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
});

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(3, "Password is too short - should be 3 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  name: Yup.string().matches(
    /[a-zA-Z]/,
    "Password can only contain Latin letters."
  )
});

class SignIn extends Component {
  state = { onSign: true, onSigntext: "Login" };
  toggleSign() {
    const { onSign } = this.state;
    this.setState({
      onSign: !onSign
    });

    if (!onSign) {
      this.setState({
        onSigntext: "Login"
      });
    } else {
      this.setState({
        onSigntext: "SignUp"
      });
    }
  }
  // componentDidMount() {
  //   this.props.getUser();
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  //   // if (nextProps.errors) {
  //   //   this.setState({ errors: nextProps.errors });
  //   // }
  // }
  render() {
    const { classes } = this.props;
    const { onSign, onSigntext } = this.state;

    // console.log("Error ", this.props.user.error);
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {onSign ? (
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          ) : (
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          )}

          <Formik
            initialValues={{
              email: "",
              password: ""
              // rememberMe: true,
              // select: "none",
              // tags: []
            }}
            // validate={values => {
            //   let errors = {};
            //   console.log(values);
            //   if (!values.email) {
            //     errors.email = "Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }
            //   return errors;
            // }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (onSign) {
                this.props.loginUser(values);
                setSubmitting(false);
              } else {
                this.props.signupUser(values);
                setSubmitting(false);
              }

              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 3));
              //   setSubmitting(false);
              // }, 400);
            }}
          >
            {/* <form className={classes.form} noValidate> */}
            {({ errors, touched, isSubmitting }) => (
              <Form className={classes.form}>
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                /> */}

                <div>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    component={TextField}
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                  />
                  {/* <Button color="primary" variant="contained">
                    <ErrorMessage name="email" component="div" />
                  </Button> */}
                </div>
                <div>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    name="password"
                    placeholder="Password"
                    component={TextField}
                    label="Password"
                    autoComplete="current-password"
                    id="password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
                {onSign ? (
                  ""
                ) : (
                  <div>
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="name"
                      placeholder="Name"
                      component={TextField}
                      label="Name"
                    />
                    <ErrorMessage name="name" component="div" />
                  </div>
                )}
                {/* <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                /> */}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {/* <MySnackbarContentWrapper
        variant="error"
        className={classes.margin}
        message="This is an error message!"
      /> */}
                <SnackbarContent
                  // className={classes.margin}
                  className={classes.error}
                  aria-describedby="client-snackbar"
                  message={
                    <span id="client-snackbar">{this.props.user.error}</span>
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}

                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          {/* </form> */}
          <Button onClick={this.toggleSign.bind(this)}>
            Don't have an account? Sign Up
          </Button>
        </div>
        <Divider variant="fullWidth" />
        <Typography>Or</Typography>
        <Divider variant="fullWidth" />
        <Button
          className={classes.buttonFb}
          component="a"
          href="http://localhost:5000/auth/facebook"
          variant="contained"
          color="primary"
          fullWidth
        >
          <Icon className={clsx(classes.icon, "fab fa-facebook-f")} />
          {onSigntext} WITH FACEBOOK
        </Button>

        <Divider variant="fullWidth" />
        <Button
          className={classes.buttonGoogle}
          component="a"
          // href="https://mighty-bayou-22851.herokuapp.com/auth/google"
          href="http://localhost:5000/auth/google"
          variant="contained"
          color="primary"
          fullWidth
        >
          <Icon className={clsx(classes.icon, "fab fa-google")} />
          {onSigntext} WITH GOOGLE
        </Button>

        <Divider variant="fullWidth" />

        <Button
          className={classes.buttonTwitter}
          component="a"
          href="http://localhost:5000/auth/twitter"
          variant="contained"
          color="primary"
          fullWidth
        >
          <Icon className={clsx(classes.icon, "fab fa-twitter")} />
          {onSigntext} WITH twitter
        </Button>
        {/* <Box mt={5}>
              <MadeWithLove />
            </Box> */}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps,
  { loginUser, getUser, signupUser }
)(withStyles(styles)(withRouter(SignIn)));
