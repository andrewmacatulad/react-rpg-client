import React from "react";
import { Paper, Container } from "@material-ui/core";
import Attributes from "./Attributes";

function SignInPage() {
  return (
    <Container style={{ paddingBottom: "100px" }}>
      <Paper>
        <Attributes />
      </Paper>
    </Container>
  );
}

export default SignInPage;
