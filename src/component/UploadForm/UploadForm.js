import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  SimpleFileUpload,
  Select,
  Switch
} from "formik-material-ui";
import { Container, Paper, Button } from "@material-ui/core";
import { addImage } from "./uploadAction";

class UploadForm extends Component {
  render() {
    return (
      <Container>
        <Formik
          initialValues={{
            image: {}
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values));
              console.log(values.image);
              this.props.addImage(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Paper>
              <Form>
                <Field name="image" component={SimpleFileUpload} />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            </Paper>
          )}
        </Formik>
      </Container>
    );
  }
}

export default connect(
  null,
  { addImage }
)(UploadForm);
