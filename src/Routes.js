import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import ForgotPassword from "./user/ForgotPassword";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Profile from "./user/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <PrivateRoute path="/user/profile" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
