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

const Menu = ({ history }) => (
  <div>
    <ul
      className="nav nav-tabs bg-dark py-2 bg-transparent"
      style={{ borderBottom: "0px" }}
    >
      <a className="navbar-brand pl-0" href="#">
        <span
          className="btn menuIcon"
        >
          Unseen{" "}
        </span>{" "}
        <span
          className="btn menuIconText"
        >Network</span>
      </a>
      {isAutheticated() && (
        <li className="nav-item ml-auto mr-1" style={{marginTop: '7px'}}>
          <span
            className="btn menuIcon"
            style={{ cursor: "pointer" }}
            style={{
              borderRadius: "30px",
              background: "#fff",
              color: "#000",
              fontSize: "18px",
            }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
