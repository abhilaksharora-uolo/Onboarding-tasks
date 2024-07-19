import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const name = localStorage.getItem("name");
  return name ? <Navigate to="/" /> : element;
};

export default PublicRoute;
