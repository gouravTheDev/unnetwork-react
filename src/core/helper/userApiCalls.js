import { API } from "../../backend";

class UserApiCalls {
  getProfile = async (token) => {
    try {
      let profileDetails = await fetch(`${API}/user/details`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      profileDetails = await profileDetails.json();
      return profileDetails;
    } catch (error) {
      console.log(error);
    }
  };

  updateProfile = async (token, data) => {
    try {
      let updatedProfile = await fetch(`${API}/user/update-profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      updatedProfile = await updatedProfile.json();
      return updatedProfile;
    } catch (error) {
      console.log(error);
    }
  };

  changePass = async (token, data) => {
    try {
      let changePass = await fetch(`${API}/user/changepassword`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      changePass = await changePass.json();
      return changePass;
    } catch (error) {
      console.log(error);
    }
  };

  uploadProfilePic = async (token, data) => {
    try {
      console.log(data)
      let uploadProfilePic = await fetch(`${API}/user/upload-profile-picture`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: data
      });
      uploadProfilePic = await uploadProfilePic.json();
      return uploadProfilePic;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserApiCalls();
