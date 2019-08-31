import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import Cookies from "js-cookie";

import "./App.css";
// import HomePage from "./component/HomePage";
import Header from "./app/layout/Header";
import Footer from "./app/layout/Footer";
// import SignIn from "./signin/SignInPage";
// import TestModalPage from "./component/TestModalPage";
import PrivateRoute from "./component/common/PrivateRoute";

import { getUser } from "./component/signin/signInAction";
import LoadingComponent from "./app/layout/LoadingComponent";
// import AtrributeTest from "./component/Attributes/AtrributeTest";
import AttributeTable from "./component/Attributes/AttributeTable";
// import FormTest from "./component/Forms/FormTest";
import ProfileDashboard from "./component/Profile/ProfileDashboard";
import ReactSelect from "./component/SelectReact";
import { Container } from "@material-ui/core";

const AsyncHomePage = Loadable({
  loader: () => import("./component/HomePage"),
  loading: LoadingComponent
});

const AsyncLoginPage = Loadable({
  loader: () => import("./component/signin/SignInPage"),
  loading: LoadingComponent
});

const AsyncTestPage = Loadable({
  loader: () => import("./component/TestModalPage"),
  loading: LoadingComponent
});

const AsyncAttributesPage = Loadable({
  loader: () => import("./component/Attributes/AttributesPage"),
  loading: LoadingComponent
});

const AsyncProtectedPage = Loadable({
  loader: () => import("./component/ProtectedAuth/ProtectedPage"),
  loading: LoadingComponent
});

const AsyncQuestDashboardPage = Loadable({
  loader: () => import("./component/Quests/QuestDashboard"),
  loading: LoadingComponent
});

const AsyncQuestAddPage = Loadable({
  loader: () => import("./component/Quests/QuestAdd"),
  loading: LoadingComponent
});

const AsyncQuestPage = Loadable({
  loader: () => import("./component/Quests/QuestPage"),
  loading: LoadingComponent
});

const AsyncNotFoundPage = Loadable({
  loader: () => import("./component/common/NotFoundPage"),
  loading: LoadingComponent
});

// if (Cookies.get("test") !== undefined) {
//   store.dispatch(getUser(Cookies.get("test")));
//   console.log("Test");
// }

class App extends Component {
  componentDidMount() {
    if (Cookies.get("test") !== undefined) {
      // console.log("Test");
      this.props.getUser(Cookies.get("test"));
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user.isAuthenticated) {
  //     this.props.history.push("/test");
  //   }
  //   // if (nextProps.errors) {
  //   //   this.setState({ errors: nextProps.errors });
  //   // }
  // }
  render() {
    return (
      <div className="App">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={AsyncHomePage} />
            <Route path="/signin" component={AsyncLoginPage} />
            {/* <PrivateRoute path="/signin">
            <SignIn />
          </PrivateRoute> */}
            <Route path="/protected" component={AsyncProtectedPage} />
            <Route path="/test" component={AsyncTestPage} />
            <Route path="/attributes" component={AsyncAttributesPage} />
            <PrivateRoute path="/attribute_table" component={AttributeTable} />
            <Route path="/formtest" component={ReactSelect} />
            <PrivateRoute path="/profile" component={ProfileDashboard} />
            <Route path="/quests" component={AsyncQuestDashboardPage} />
            <PrivateRoute path="/quest_add" component={AsyncQuestAddPage} />
            <Route path="/:userId/quest/:questId" component={AsyncQuestPage} />
            <Route component={AsyncNotFoundPage} />
          </Switch>
        </Container>
        {/* <Footer /> */}
        {/* <PrivateRoute path="/dashboard" component={TestModalPage} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(withRouter(App));
// export default App;
