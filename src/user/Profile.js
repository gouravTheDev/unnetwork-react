import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Modal, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import UserApiCalls from "../core/helper/userApiCalls";
import { signout } from "../auth/helper";

const cookies = new Cookies();

const Profile = ({ history }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({ ...values, msg: "" });
    setShow(true);
  };
  const [values, setValues] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    profession: "",
    profile_pic: "",
    address: "",
    msg: "",
  });

  const { first_name, last_name, sex, address, profession, phone } = values;
  let inputFile = "";

  const [token, setToken] = useState("");

  const [showP, setShowP] = useState(false);
  const handleCloseP = () => setShowP(false);
  const handleShowP = () => {
    setValuesP({ password_1: "", password_2: "", msgP: "" });
    setShowP(true);
  };

  const [valuesP, setValuesP] = useState({
    password_1: "",
    password_2: "",
    msgP: "",
  });

  const { password_1, password_2, msgP } = valuesP;

  const handleChange = (name) => (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (name) => async (event) => {
    console.log(event.target.files[0]);
    let formData = new FormData();
    formData.set("profile_pic", event.target.files[0]);

    for (var value of formData.values()) {
      console.log(value);
    }

    let uploadProfilePic = await UserApiCalls.uploadProfilePic(token, formData);

    if (uploadProfilePic) {
      console.log(uploadProfilePic)
      if (uploadProfilePic.status == 200) {
        setValues({ ...values, profile_pic: uploadProfilePic.data.profile_pic });
      }
    }
  };

  const handleChangeP = (name) => (event) => {
    setValuesP({ ...valuesP, [name]: event.target.value });
  };

  const uploadClick = (e) => {
    e.preventDefault();
    inputFile.click();
    return false;
  };

  async function fetchData() {
    try {
      let token = cookies.get("token");
      setToken(token);
      let response = await UserApiCalls.getProfile(token);
      console.log(response);
      let dataR = response;
      setValues({
        ...values,
        first_name: dataR.first_name,
        last_name: dataR.last_name,
        email: dataR.email,
        phone: dataR.phone,
        profession: dataR.profession,
        profile_pic: dataR.profile_pic,
        address: dataR.address,
        id: dataR.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onProfileUpdate = async (event) => {
    setValues({ ...values, msg: "" });
    event.preventDefault();
    if (
      first_name == "" ||
      last_name == "" ||
      sex == "" ||
      profession == "" ||
      phone == "" ||
      address == ""
    ) {
      setValues({
        ...values,
        msg: "Please fill all the fields",
      });
      return;
    }

    // API call
    let updateProfile = await UserApiCalls.updateProfile(token, values);

    if (updateProfile) {
      setValues(updateProfile.data);
      setValues({ ...values, msg: updateProfile.message });
    }
  };

  const onPasswordChange = async (event) => {
    setValuesP({ ...valuesP, msg: "" });
    event.preventDefault();
    if (password_1 == "" || password_2 == "") {
      setValuesP({
        ...valuesP,
        msgP: "Please fill all the fields",
      });
      return;
    }

    // API call
    let changePass = await UserApiCalls.changePass(token, valuesP);

    if (changePass) {
      if (changePass.status == 201) {
        setValuesP({ ...valuesP, msgP: changePass.message });
      } else {
        setValuesP({ ...valuesP, msgP: changePass.message });
      }
      console.log(changePass);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Base title="Profile page">
      <form>
        <input
          id="inputFile"
          type="file"
          ref={(input) => {
            inputFile = input;
          }}
          onChange={handleFileUpload(this)}
        />
      </form>
      <div
        className="container"
        style={{ borderBottom: "1px solid rgb(218, 206, 206)" }}
      >
        <div className="row pt-2">
          <div className="col-12 mx-auto text-center pt-4">
            <img src={values.profile_pic ? 'https://unnetwork-admin.codewithbogo.in/uploads/user/profile_pic/'+values.profile_pic : "/fig/userIm.png" } className="profilePic" />
            <img
              src="/fig/edit.png"
              className="profilePicEdit"
              onClick={uploadClick}
            />
          </div>
          <div className="col-12 text-center mt-4 mb-2">
            <h5>
              General Information
              <img
                src="/fig/edit.png"
                className="editprofileBtn"
                onClick={handleShow}
              />
            </h5>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-1">
            <div className="pt-2">
              <div className="row">
                <div className="col-4 text-left">Name</div>
                <div className="col-8 text-left borderedCol">
                  {values.first_name} {values.last_name}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Profession</div>
                <div className="col-8 text-left borderedCol">
                  {values.profession}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Address</div>
                <div className="col-8 text-left borderedCol">
                  {values.address}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Phone</div>
                <div className="col-8 text-left borderedCol">
                  {values.phone}
                </div>
              </div>
              <div className="row mt-3 borderedCol pb-3">
                <div className="col-4 text-left">Mail</div>
                <div className="col-8 text-left">{values.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row borderedCol">
          <div className="col-12 text-center borderCol pt-3 pb-2">
            <h5>
              Personal Information{" "}
              <img
                src="/fig/edit.png"
                className="editprofileBtn"
                onClick={handleShowP}
              />
            </h5>
          </div>
        </div>
        <div className="row mt-3 borderedCol pb-3">
          <div className="col-4 text-left">Password</div>
          <div className="col-8 text-left">******</div>
        </div>
      </div>

      {/*Edit Profile Modal Starts */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>First Name</label>
                <input
                  className="form-control"
                  onChange={handleChange("first_name")}
                  value={values.first_name}
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Last Name</label>
                <input
                  className="form-control"
                  onChange={handleChange("last_name")}
                  value={values.last_name}
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  onChange={handleChange("email")}
                  value={values.email}
                  type="text"
                  readOnly
                  placeholder="Enter Email"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  onChange={handleChange("phone")}
                  value={values.phone}
                  type="text"
                  placeholder="Enter Phone"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Profession</label>
                <input
                  className="form-control"
                  onChange={handleChange("profession")}
                  value={values.profession}
                  type="text"
                  placeholder="Enter Profession"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Address</label>
                <input
                  className="form-control"
                  onChange={handleChange("address")}
                  value={values.address}
                  type="text"
                  placeholder="Enter Address"
                />
              </div>
              <div className="col-12 mx-auto text-center">
                <span>{values.msg != "" ? values.msg : ""}</span>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button className="btn btn-success" onClick={onProfileUpdate}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*Edit Profile Modal Ends */}

      {/*Pass change Modal Starts */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showP}
        onHide={handleCloseP}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Password</label>
                <input
                  className="form-control"
                  onChange={handleChangeP("password_1")}
                  value={valuesP.password_1}
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Re Enter the Password</label>
                <input
                  className="form-control"
                  onChange={handleChangeP("password_2")}
                  value={valuesP.password_2}
                  type="password"
                  placeholder="Re Enter the Password"
                />
              </div>
              <div className="col-12 mx-auto text-center">
                <span>{msgP != "" ? msgP : ""}</span>
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button className="btn btn-success" onClick={onPasswordChange}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*Edit Profile Modal Ends */}

      <div className="container row mt-2 mb-3">
        <div className="col-12 text-center">
          <button
            className="btn btn-danger"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
