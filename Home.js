import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Menu from "./Menu";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

export default function Home() {
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
    return <Link style={{}} className="btn shadow" to="/user/profile"></Link>;
  };

  return (
    <div>
      <div className="homeD">
        <img src="/Unseen_network.png" className="" />
      </div>
      <div className="homeM">
        <div className="container pb-4" style={{ minHeight: "150vh" }}>
          <div className="row pt-0">
            <img src="/Unseen_network.png" className="" />

            <p
              style={{
                color: "#ffffff",
                position: "absolute",
                width: "82px",
                height: "19px",
                left: "280px",
                top: "50px",
              }}
            >
              Sign Out
            </p>

            <div className="col-md-12 col-sm-12 text-center pt-0">
              <img src="/Logo.png" className="homeImgM" />
            </div>

            <div className="col-md-12 col-sm-12 text-center">
              {/* <p className="textLM" style={{marginBottom: '0px'}}>
                Unseen
              </p>
              <p className="textLM" style={{marginTop: '0px', marginBottom: '10px', lineHeight: '30px'}}>
                Network
              </p> */}
              <p className="longtext" style={{}}>
                Welcome. <br />
                <br />
                We’ve been waiting for you. The world needs you, but we
                understand you won’t be able to do this alone. Let us support
                you, and place you in an environment with creatives just like
                you. <br />
                <br />
                Welcome to The Unseen Network.
              </p>

              <div
                className="col-md-12 col-sm-12 text-center"
                style={{ background: "#000000" }}
              >
                <button class="rounded-pill" style={{ color: "#00BFFF" }}>
                  profile
                </button>
              </div>

              {homeButton()}

              <div
                className="container"
                style={{ position: "fixed", bottom: "0px" }}
              >
                <img src="/Unseen_network.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
