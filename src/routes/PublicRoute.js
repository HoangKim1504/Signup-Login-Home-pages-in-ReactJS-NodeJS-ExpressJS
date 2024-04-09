import React from "react";
import { Navigate } from "react-router-dom";
import isLogged from "../helper";

// // PrivateRoute component to check if user is logged in or not before rendering the component passed to it as props
const PrivateRoute = ({ children }) => {
  // If user is logged in, redirect to the home page
  // Else, render the component passed to the PrivateRoute component as props
  // console.log(isLogged);
  const isLoggedIn = isLogged(); // ham thuc thi isLogged() de lay gia tri tra ve
  // console.log(isLoggedIn);
  return isLoggedIn ? <Navigate to="/home" /> : children;
};

export default PrivateRoute;
