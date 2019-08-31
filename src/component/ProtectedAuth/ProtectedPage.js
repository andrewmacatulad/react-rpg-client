import React, { Component } from "react";
import { connect } from "react-redux";
import { getProtectPage } from "./protectedAction";

class ProtectedPage extends Component {
  componentDidMount() {
    this.props.getProtectPage();
  }

  render() {
    const { page, user } = this.props;

    return (
      <div>
        {user.isAuthenticated ? <h2>{page.page}</h2> : <h2>Not Logged In</h2>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user, page: state.page };
};

export default connect(
  mapStateToProps,
  { getProtectPage }
)(ProtectedPage);
