import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const name = localStorage.getItem("name");
  return name ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
