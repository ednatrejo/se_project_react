import { baseUrl } from "../utils/api";
import { processServerResponse } from "../utils/Utils";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.edna.twilightparadox.com"
    : "http://localhost:3001";

//signup for registration
export const registration = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(processServerResponse);
  // .catch((err) => {
  //   console.log(err);
  // });
};

//signin for user authorization

export const authorization = ({ email, password }) => {
  console.log("signIn step");
  // console.log("signIn", { email, password });
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

//check token
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
  // .catch((err) => {
  //   console.log(err);
  // });
};
