import React from "react";
import "./Login.css"

const Login = () => {
  return (
    <div className="login">
      <div className="flex">
        <div className="login-image">
          <img src="images/image 550.png" alt="" />
        </div>
        <div className="frame">
          <img src="images/vector.png" alt="" />
          <div className="line"></div>
          <div>
            <h3>Welcome Back!</h3>
            <p>Log in to continue and access all the features</p>
          </div>
          <div>
            <label>Enter Email</label>
            <input type="email" placeholder="vikr" />

            <label>Enter Password</label>
            <input type="password" placeholder="pppppp" />

            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
