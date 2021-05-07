import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    if (!email || !password || email == "" || password == "") {
      setValues({
        ...values,
        error: "Please fill all the fields",
        loading: false,
      });
      return;
    }
    let data = await signin({ email, password });
    // console.log(data)
    if (data && data != {}) {
      if (data.status == 201) {
        setValues({ ...values, error: data.message, loading: false });
      } else {
        authenticate(data.data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    } else {
      setValues({ ...values, error: "Could not process now!", loading: false });
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/user/profile" />;
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="loginHome container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <h1
              className="font-weight-bold mt-4 mb-3"
              style={{ fontSize: "2.6em" }}
            >
              Sign in
            </h1>
          </div>
          <div className="col-md-6 offset-sm-3">
            <form>
              <div
                className="form-group mb-4"
                style={{
                  marginTop: "36px",
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingTop: "20px",
                  paddingBottom: "12px",
                }}
                id="customGroup"
              >
                <div className="mt-0 mb-2 py-0">Email address</div>
                <div className="row mt-2">
                  <div className="col-1">
                    <img src="/fig/email.png" className="inputIcon" />
                  </div>
                  <div className="col-10 pl-3">
                    <input
                      id="floatingInput"
                      type="email"
                      placeholder="name@example.com"
                      onChange={handleChange("email")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className="form-group mb-4"
                style={{
                  marginTop: "32px",
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingTop: "20px",
                  paddingBottom: "12px",
                }}
                id="customGroup"
              >
                <div className="mt-0 mb-2 py-0">Password</div>
                <div className="row mt-2 pr-2">
                  <div className="col-1">
                    <img src="/fig/lock.png" className="inputIcon" />
                  </div>
                  <div className="col-9 pl-3">
                    <input
                      id="floatingInput2"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange("password")}
                      required
                    />
                  </div>
                  <div className="col-1 pt-1 text-right">
                    <img src="/fig/view.png"  style={{ color: "#B2B2AF" }} />
                    {/* <i className="fas fa-eye" style={{ color: "#B2B2AF" }}></i> */}
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <p style={{ fontSize: "13px" }}>
                  Creating an account means you're okay with our Terms of
                  Service out Privacy Policy
                </p>
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-info mt-3 mb-3 btnCustom"
              >
                Log In
              </button>
            </form>
          </div>
          <div className="col-12 mx-auto text-center">
            <span>{values.error != "" ? values.error : ""}</span>
          </div>
          <div className="col-md-6 col-sm-12 mt-3">
            <p style={{ fontSize: "13px" }}>
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "#FDC605" }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {signInForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
