import { API } from "../../backend";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const signup = (user) => {
  return fetch(`${API}/user/sign-up`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/user/sign-in`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    cookies.set("token", data.api_token, { path: "/" });
    next();
  }
};

export const signout = (next) => {
  let token = cookies.get("token");
  if (token && token != "") {
    cookies.remove("token", { path: "/" });
    next();

    return fetch(`${API}/user/logout`, {
      method: "GET",
      headers: {
        Authorization: "Bearer "+token
      },
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAutheticated = () => {
  let token = cookies.get("token");
  if (!token) {
    return false;
  } else {
    return token;
  }
};
