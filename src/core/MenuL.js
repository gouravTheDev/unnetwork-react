import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const MenuL = ({ history }) => (
  <div className="container customMenu pt-2">
    <div className="row">
      <div className="col-7">
        <span style={{ marginRight: "7px" }}>
          <i className="fas fa-bars"></i>
        </span>
        Unseen Network
      </div>
      <div className="col-5" style={{ textAlign: "right" }}>
        <span className="mx-2">
          <i className="fas fa-search"></i>
        </span>
        <span className="mx-2">
          <i className="fas fa-envelope"></i>
        </span>
        <span className="ml-2">
          <i className="fas fa-bell"></i>
        </span>
      </div>
    </div>
  </div>
);

export default withRouter(MenuL);
