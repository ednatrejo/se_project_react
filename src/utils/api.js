import { processServerResponse } from "./Utils";

export const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(processServerResponse);
};

// export const getItems = () => {
//   return fetch(`${baseUrl}/items`).then(processServerResponse);
// };

export const addItems = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");
  console.log(token);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(processServerResponse);
};

export const deleteItems = (_id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const updateProfile = (name, avatar) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(processServerResponse);
};

export const addCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};

export const removeCardLike = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
};
