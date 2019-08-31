// import React from "react";
// import { connect } from "react-redux";
// import { Route, Redirect } from "react-router-dom";
// // import PropTypes from "prop-types";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       auth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="login" />
//       )
//     }
//   />
// );

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // const { user } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        user.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
          // <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  user: state.user
});

// export default connect(
//   mapStateToProps,
//   null,
//   null,
//   {
//     pure: false
//   }
// )(PrivateRoute);

export default connect(mapStateToProps)(PrivateRoute);
