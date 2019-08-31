import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ProtectedPage from "./ProtectedAuth/ProtectedPage";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing(2)
  }
});

class HomePage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        <ProtectedPage />
        {/* <Button
          component={Link}
          to="/signin"
          variant="contained"
          color="primary"
        >

          LOGIN WITH FACEBOOK
          <Icon className={clsx(classes.icon, "fab fa-facebook")} />
        </Button> */}
        {/* <FontAwesomeIcon icon={faFacebook} />
          <Typography> Facebook</Typography> */}
        {/* <Divider variant="middle" />
        <Typography>TEST</Typography> */}
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
