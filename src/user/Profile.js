import React from "react";
import Base from "../core/Base";

const Profile = () => {
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
            <h5>General Information <img src="/fig/edit.png" className="editprofileBtn" /></h5>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mt-1">
            <div className="pt-2">
              <div className="row">
                <div className="col-4 text-left">Name</div>
                <div className="col-8 text-left borderedCol">Anna Rybak</div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Profession</div>
                <div className="col-8 text-left borderedCol">Designer</div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Address</div>
                <div className="col-8 text-left borderedCol">
                  USA, Snellville, Georgia
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-4 text-left">Phone</div>
                <div className="col-8 text-left borderedCol">
                  +1 89898989898
                </div>
              </div>
              <div className="row mt-3 borderedCol pb-3">
                <div className="col-4 text-left">Mail</div>
                <div className="col-8 text-left">demo@yopmal.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row borderedCol">
          <div className="col-12 text-center borderCol pt-3 pb-2">
            <h5>Personal Information <img src="/fig/edit.png" className="editprofileBtn" /></h5>
          </div>
        </div>
        <div className="row mt-3 borderedCol pb-3">
            <div className="col-4 text-left">Password</div>
            <div className="col-8 text-left">******</div>
          </div>
      </div>
    </Base>
  );
};

export default Profile;
