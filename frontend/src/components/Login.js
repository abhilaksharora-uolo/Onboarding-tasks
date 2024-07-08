import React from "react";
import styled from "styled-components";

const LoginImage = styled.div`
  padding: 50px;
`;

const LoginImageI = styled.div`
  width: 580px;
  height: 770px;
  top: 127px;
  left: 116px;
  gap: 0px;
  opacity: 0px;
  border-radius: 20px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 50px;
`;

const FrameImage = styled.img`
  width: 148.48px;
  height: 50px;
  gap: 0px;
  opacity: 0px;
`;

const FrameTitle = styled.h3`
  font-family: Outfit;
  font-size: 48px;
  font-weight: 700;
  line-height: 60.48px;
  letter-spacing: 0.25px;
  text-align: left;
  margin: 0;
  color: #101828;
`;

const FramePara = styled.p`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.07px;
  text-align: left;
  color: #3f3f3f;
  opacity: 70%;
  margin: 0;
`;

const Line = styled.div`
  width: 148.48px;
  height: 0px;
  gap: 0px;
  border: 1px 0px 0px 0px;
  margin: 40px 0;
  border: 1px solid #00000033;
`;

const Logo = styled.img`
  width: 70px;
  height: 24px;
`;

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
