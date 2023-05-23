import api from "../api/axiosconfig";
import React, { useState } from "react";

export function login(username, email, password) {
  return api
    .post("/api/auth/signin", { username, email, password })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}

export function logout() {
  localStorage.removeItem("user");
}

export function register(username, email, password, confirmPassword) {
  return api.post("/api/auth/signup", {
    username,
    email,
    password,
    confirmPassword,
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

function AuthService() {}

export default AuthService;
