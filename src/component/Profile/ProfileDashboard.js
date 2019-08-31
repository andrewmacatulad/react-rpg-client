import React from "react";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, Redirect } from "react-router-dom";
import ProfileBasic from "./ProfileBasic";
import ProfileNav from "./ProfileNav";
import ProfileAbout from "./ProfileAbout";
import FormTest from "../Forms/FormTest";
import ProfileInfo from "./ProfileInfo";

const ProfileDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {/* <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" render={() => <ProfileBasic />} />
          <Route path="/settings/about" render={() => <ProfileBasic />} />
        
          <Route path="/settings/account" render={() => <ProfileBasic />} />
        </Switch> */}
        {/* <Route path="/settings/photos" component={PhotosPage} /> */}
        {/* <Redirect exact from="/profile" to="/profile/basic" /> */}
        <Switch>
          {/* <Redirect exact from="/profile" to="/profile/basic" /> */}
          <Route path="/profile/basic" render={() => <ProfileBasic />} />
          <Route path="/profile/about" render={() => <ProfileAbout />} />
          <Route path="/profile/test" render={() => <FormTest />} />
          <Route path="/profile/info" render={() => <ProfileInfo />} />
        </Switch>
      </Grid>
      <Grid item xs={3}>
        <ProfileNav />
      </Grid>
    </Grid>
  );
};

export default ProfileDashboard;
