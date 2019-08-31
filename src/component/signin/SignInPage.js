import React from "react";
import SignIn from "./SignIn";
import { Paper, Container } from "@material-ui/core";

function SignInPage() {
  return (
    <Container style={{ paddingBottom: "100px" }}>
      <Paper>
        <SignIn />
      </Paper>
    </Container>
  );
}

export default SignInPage;
