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
        authenticate(data, () => {
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
      return <Redirect to="/user/todo" />;
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="loginHome container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <h1 className="ml-2">Sign in</h1>
          </div>
          <div className="col-md-6 offset-sm-3">
            <form>
              <div
                className="form-group mb-4 mt-4"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">Email address</div>
                <div className="row mt-2">
                  <div className="col-md-2 col-sm-2 pt-1" style={{width: '10%'}}>
                    <i className="fas fa-envelope inputIcon"></i>
                  </div>
                  <div className="col-md-10 col-sm-10">
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
                className="form-group mb-4 mt-4"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">Password</div>
                <div className="row mt-2">
                  <div className="col-1 pt-1">
                    <i className="fas fa-lock inputIcon"></i>
                  </div>
                  <div className="col-11">
                    <input
                      id="floatingInput2"
                      type="password"
                      placeholder="*** *** ***"
                      onChange={handleChange("password")}
                      required
                    />
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

  return <div>{signInForm()}</div>;
};

export default Signin;
