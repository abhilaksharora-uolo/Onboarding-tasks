import React from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Home />} />,
    children: [
      { index: true, element: <PrivateRoute element={<Users />} /> },
      { path: "/add-user", element: <PrivateRoute element={<AddUser />} /> },
    ],
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
