import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signup, authenticate, isAutheticated } from "../auth/helper";

const Signup = () => {
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/user/profile" />;
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    sex: "Man",
    address: "",
    password: "",
    error: "",
    didRedirect: false,
    success: false,
  });

  const {
    first_name,
    last_name,
    email,
    sex,
    address,
    password,
    profession,
    didRedirect,
    error,
    success,
  } = values;
  const { user } = isAutheticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if (
      password == "" ||
      first_name == "" ||
      last_name == "" ||
      email == "" ||
      sex == "" ||
      address == ""
    ) {
      console.log(values);
      setValues({
        ...values,
        error: "Please fill all the fields",
        loading: false,
      });
      return;
    }
    if (password.length < 6) {
      setValues({
        ...values,
        error: "Password must be at least 6 characters!",
        loading: false,
      });
      return;
    }
    let data = await signup({ first_name, last_name, email, sex, password, address });
    if (data && data != {}) {
      if (data.status == 201) {
        setValues({ ...values, error: data.message});
      } else {
        authenticate(data.data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    } else {
      setValues({ ...values, error: "Could not process now!"});
    }
  };

  const signUpForm = () => {
    return (
      <div className="loginHome container">
        <div className="row">
          <div className="col-md-12 mb-3">
            <h1 className="ml-2">Register</h1>
          </div>
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div
                className="form-group mb-3 mt-2"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">First Name</div>
                <div className="row mt-2">
                  <div className="col-1 pt-0">
                    <i className="fas fa-user inputIcon"></i>
                  </div>
                  <div className="col-10 pl-2">
                    <input
                      id="floatingInput"
                      type="text"
                      placeholder="John"
                      onChange={handleChange("first_name")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                className="form-group mb-3 mt-2"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">Last Name</div>
                <div className="row mt-2">
                  <div className="col-1 pt-0">
                    <i className="fas fa-user inputIcon"></i>
                  </div>
                  <div className="col-10 pl-2">
                    <input
                      id="floatingInput"
                      type="text"
                      placeholder="Doe"
                      onChange={handleChange("last_name")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                className="form-group mb-3 mt-2"
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
                  <div className="col-1 pt-1">
                    <i className="fas fa-envelope inputIcon"></i>
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

              <div
                className="form-group mb-3 mt-2"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">Sex</div>
                <div className="row mt-2">
                  <div className="col-1 pt-0">
                    <i className="fas fa-mars-stroke inputIcon"></i>
                  </div>
                  <div className="col-10 pl-2">
                    <select id="floatingInput" onChange={handleChange("sex")}>
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className="form-group mb-3 mt-2"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">Password</div>
                <div className="row mt-2 pr-2">
                  <div className="col-1 pt-1">
                    <i className="fas fa-lock inputIcon"></i>
                  </div>
                  <div className="col-9 pl-2">
                    <input
                      id="floatingInput2"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange("password")}
                      required
                    />
                  </div>
                  <div className="col-1 pt-1 text-right">
                    <i className="fas fa-eye" style={{ color: "#B2B2AF" }}></i>
                  </div>
                </div>
              </div>
              <div
                className="form-group mb-3 mt-2"
                style={{
                  borderRadius: "13px",
                  border: "1px solid #fff",
                  padding: "10px",
                  paddingBottom: "5px",
                }}
                id="customGroup"
              >
                <div className="my-0 py-0">City - State</div>
                <div className="row mt-2">
                  <div className="col-1 pt-1">
                    <i className="fas fa-map-marker inputIcon"></i>
                  </div>
                  <div className="col-10 pl-2">
                    <input
                      id="floatingInput2"
                      type="text"
                      placeholder="LA, California"
                      onChange={handleChange("address")}
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
              <div
                className="form-group my-2"
                style={{ display: error ? "" : "none", color: "red" }}
              >
                {error}
              </div>
              <button
                onClick={onSubmit}
                className="btn btn-info mt-3 mb-3 btnCustom"
              >
                Create an Account
              </button>
            </form>
          </div>
          <div className="col-12 mx-auto text-center">
            <span>{values.error != "" ? values.error : ""}</span>
          </div>
          <div className="col-md-6 col-sm-12 mt-3">
            <p style={{ fontSize: "13px" }}>
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#FDC605" }}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {signUpForm()}
      {performRedirect()}
    </div>
  );
};

export default Signup;
