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
    return (
      <Link
        style={{
          borderRadius: "40px",
          background: "#ffffff",
          color: "#000",
          fontSize: "20px",
        }}
        className="btn shadow"
        to="/user/profile"
      >
       {token ? 'Profile' : 'Get Started'} 
      </Link>
    );
  };

  return (
    <div>
      <div className="homeD"></div>
      <div className="homeM">
        <div className="container pb-4" style={{ minHeight: "100vh" }}>
          <Menu />

          <div className="row pt-0">
            <div className="col-md-12 col-sm-12 text-center pt-0">
              <img src="/landing.png" className="homeImgM" />
            </div>
            <div className="col-md-12 col-sm-12 text-center">
              {/* <p className="textLM" style={{marginBottom: '0px'}}>
                Unseen
              </p>
              <p className="textLM" style={{marginTop: '0px', marginBottom: '10px', lineHeight: '30px'}}>
                Network
              </p> */}
              <p
                style={{
                  marginBottom: "35px",
                  marginTop: "40px",
                  color: "#ffffff",
                }}
              >
                Welcome. We’ve been waiting for you. The world needs you, but we
                understand you won’t be able to do this alone. Let us support
                you, and place you in an environment with creatives just like
                you. <br />
                Welcome to The Unseen Network.{" "}
              </p>
              {homeButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
