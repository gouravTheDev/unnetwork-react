import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Menu from "./Menu";
import Cookies from "universal-cookie";
import { Link, Redirect } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const cookies = new Cookies();

export default function Home({ history }) {
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    let token = cookies.get("token");
    if (token) {
      console.log("hello");
      setToken(token);
    }
  });

  const homeButton = () => {
    return (
      <Link className="btn homeBtn shadow" to="/user/profile">
        {token ? "Profile" : "Get Started"}
      </Link>
    );
  };
  const logoutBtn = () => {
    return (
      <p
        style={{ marginTop: "50px", color: "#DBDBDB" }}
        onClick={() => {
          signout(() => {
            history.push("/");
          });
          return <Redirect to="/" />;
        }}
      >
        {token ? (
          <div>
            <img src="/arrow.png" /> <span>sign out</span>
          </div>
        ) : (
          ""
        )}
      </p>
    );
  };

  return (
    <div>
      <div className="homeD"></div>
      <div className="homeM">
        <img
          src="/Unseen_network.png"
          style={{ position: "fixed", top: "0", width: "100%" }}
        />
        <div className="container pb-4" style={{ minHeight: "100vh" }}>
          <div className="row pt-0">
            <div className="col-12 text-right">{logoutBtn()}</div>
            <div className="col-md-12 col-sm-12 text-right pt-0">
              <img src="/Logo.png" className="homeImgM" />
            </div>
            <div className="col-10 text-left">
              <p
                style={{
                  marginBottom: "20px",
                  marginTop: "19%",
                  color: "#ffffff",
                }}
              >
                <span>Welcome,</span> <br /> <br />
                We’ve been waiting for you. The world needs you, but we
                understand you won’t be able to do this alone. Let us support
                you, and place you in an environment with creatives just like
                you. <br /> <br />
                Welcome to The Unseen Network.{" "}
                <img src="/rec.png" className="recImg" />
              </p>
            </div>
            <div className="col-12 text-right mt-0">{homeButton()}</div>
          </div>
        </div>
        <img
          src="/Unseen_networkb.png"
          style={{ position: "fixed", bottom: "0", width: "100%" }}
        />
      </div>
    </div>
  );
}
