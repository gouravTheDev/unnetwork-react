import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  signin,
  forgotPass,
  authenticate,
  isAutheticated,
} from "../auth/helper";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const { email, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    if (!email || email == "") {
      setValues({
        ...values,
        error: "Please fill all the fields",
        loading: false,
      });
      return;
    }
    let data = await forgotPass({ email: email });
    // console.log(data)
    if (data && data != {}) {
      if (data.status == 201) {
        setValues({
          ...values,
          email: "",
          error: data.message,
          loading: false,
        });
      } else {
        setValues({ ...values, email: "" });
        setShowSuccessMsg(true);
      }
    } else {
      setValues({ ...values, error: "Could not process now!", loading: false });
    }
  };

  const ForgotPasswordForm = () => {
    return (
      <div className="loginHome container">
        <div className="row">
          <div className="col-md-12 mb-2">
            <h1
              className="mt-4 mb-1"
              style={{ fontSize: "2.6em", fontWeight: "900" }}
            >
              Forgot Password
            </h1>
            <p className="mt-2">Enter Your Registered Email Id</p>
          </div>
          <div className="col-md-6 offset-sm-3">
            <form>
              <div
                className="form-group mb-4"
                style={{
                  marginTop: "36px",
                  borderRadius: "15px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingLeft: "14px",
                  paddingTop: "20px",
                  paddingBottom: "12px",
                }}
                id="customGroup"
              >
                <div className="mt-0 mb-2 py-0">Email address</div>
                <div className="row mt-2">
                  <div className="col-1">
                    <img
                      src="/fig/email.svg"
                      className="inputIcon"
                      style={{ height: "18px" }}
                    />
                  </div>
                  <div className="col-10 pl-2">
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

              <button
                style={{
                  marginBottom: "46px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  fontSize: "1.1em",
                }}
                onClick={onSubmit}
                className="btn btn-info mt-3 btnCustom"
              >
                Reset Password
              </button>
            </form>
          </div>
          {showSuccessMsg ? (
            <div className="col-md-6 col-sm-12 text-center">
              <p style={{ fontSize: "18px" }}>
                A new password has been sent to your email account!
              </p>
              <p style={{ fontSize: "18px" }}>
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "#FA983B" }}
                >
                  Login
                </Link>
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="col-12 mx-auto text-center">
            <span>{values.error != "" ? values.error : ""}</span>
          </div>
        </div>
      </div>
    );
  };

  return <div>{ForgotPasswordForm()}</div>;
};

export default ForgotPassword;
