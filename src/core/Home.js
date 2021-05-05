import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Menu from "./Menu";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

export default function Home() {
  // const [error, setError] = useState(false);
  // const [token, setToken] = useState("");

  return (
    <div>
      <div className="homeD">

      </div>
      <div className="homeM">
        <div className="container pb-4" style={{ minHeight: "100vh" }}>
          <Menu />

          <div className="row pt-0">
            <div className="col-md-12 col-sm-12 text-center pt-0">
              <img src="/networking.png" className="homeImgM" />
            </div>
            <div className="col-md-12 col-sm-12 text-center">
              {/* <p className="textLM" style={{marginBottom: '0px'}}>
                Unseen
              </p>
              <p className="textLM" style={{marginTop: '0px', marginBottom: '10px', lineHeight: '30px'}}>
                Network
              </p> */}
              <p style={{marginBottom: '35px', marginTop: '40px', color: '#ffffff'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
              <Fragment>
                <Link
                  style={{
                    borderRadius: "30px",
                    background: "#F72D2D",
                    color: "#ffffff",
                    fontSize: "20px",
                    textShadow: "2px 2px 4px #000000"
                  }}
                  className="btn"
                  to="/signin"
                >
                  Get Started
                </Link>
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
