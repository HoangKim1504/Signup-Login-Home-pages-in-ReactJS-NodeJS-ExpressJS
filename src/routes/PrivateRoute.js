import React from "react";
import { Navigate } from "react-router-dom";
import isLogged from "../helper";

// // PrivateRoute component to check if user is logged in or not before rendering the component passed to it as props
const PrivateRoute = ({ children }) => {
  // If user is logged in, render the component passed to the PrivateRoute component as props
  // Else, redirect to the login page
  // console.log(isLogged);
  const isLoggedIn = isLogged(); // ham thuc thi isLogged() de lay gia tri tra ve
  // console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
