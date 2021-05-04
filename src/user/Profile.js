import React, { useState } from "react";
import Base from "../core/Base";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showP, setShowP] = useState(false);
  const handleCloseP = () => setShowP(false);
  const handleShowP = () => setShowP(true);
  
  const [values, setValues] = useState({
    email: "demo@yopmail.com",
    first_name: "Anna",
    last_name: "Rybak",
    phone: "9090990007",
    profession: "Designer",
    address: "USA, Snellville, Georgia"
  });

  const [valuesP, setValuesP] = useState({
    password: "",
    passwordRe: ""
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeP = (name) => (event) => {
    setValues({ ...valuesP, [name]: event.target.value });
  };

  return (
    <Base title="Profile page">
      <div
        className="container"
        style={{ borderBottom: "1px solid rgb(218, 206, 206)" }}
      >
        <div className="row pt-3">
          <div className="col-12 mx-auto text-center pt-4">
            <img src="/fig/userIm.png" />
            <img src="/fig/edit.png" className="profilePicEdit" />
          </div>
          <div className="col-12 text-center mt-4 mb-2">
            <h5>
              General Information{" "}
              <img src="/fig/edit.png" className="editprofileBtn" onClick={handleShow}/>
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
                <div className="col-8 text-left borderedCol">{values.profession}</div>
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
              <img src="/fig/edit.png" className="editprofileBtn" onClick={handleShowP} />
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
                  placeholder="Enter Email"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  onChange={handleChange("phone")}
                  value={values.phone}
                  type="number"
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
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button className="btn btn-success">
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
                  onChange={handleChangeP("password")}
                  value={values.password}
                  type="text"
                  placeholder="Enter Password"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto mb-3">
                <label>Re Enter the Password</label>
                <input
                  className="form-control"
                  onChange={handleChangeP("passwordRe")}
                  value={values.passwordRe}
                  type="text"
                  placeholder="Re Enter the Password"
                />
              </div>
              <div className="col-md-12 col-sm-12 mx-auto text-right">
                <button className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*Edit Profile Modal Ends */}

    </Base>
  );
};

export default Profile;
