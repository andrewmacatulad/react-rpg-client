import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import SignIn from "../component/signin/SignIn";

class TestModalPage extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { auth } = this.props;
    console.log(auth);
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Open dialog
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          {auth && auth.isAuthenticated ? (
            <div>
              <h1>Already Logged In</h1>
            </div>
          ) : (
            <SignIn />
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.user };
};

export default connect(mapStateToProps)(TestModalPage);
