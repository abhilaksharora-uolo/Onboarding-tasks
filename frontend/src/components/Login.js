import React, { useState } from "react";
import styled from "styled-components";

const LoginImage = styled.div`
  @media (min-width: 1024px) {
    padding: 50px;
  }

  @media (max-width: 320px) {
    display: none;
  }
`;

const LoginImageI = styled.img`
  width: 480px;
  height: 670px;
  top: 127px;
  left: 116px;
  gap: 0px;
  opacity: 0px;
  border-radius: 20px;

  @media (max-width: 1024px) {
    display: none;
  }
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
  height: 100vh;
`;

const FrameImage = styled.img`
  width: 136px;
  height: 40px;
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
  font-family: "Open Sans";
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

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 30px 0;
`;

const AddInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  @media (max-width: 1024px) {
    margin: 20px 0;
  }
`;

const CardLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 5px;
  font-family: "Open Sans";
  &::after {
    content: " *";
    color: red;
  }
`;

const CardInput = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  font-family: "Open Sans";
  width: 350px;
  height: 20px;

  &:focus {
    outline: none;
    border: #5b35da 1px solid;
  }

  @media (max-width: 1024px) {
    height: 32px;
  }
`;

const CardButton = styled.button`
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  height: 40px;
  width: 380px;
  background: ${({ active }) => (active ? "#561fe7" : "#98a2b3")};
  color: white;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};

  @media (max-width: 1024px) {
    height: 44px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isActive = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Flex>
        <LoginImage>
          <LoginImageI src="images/image 550.png" alt="" />
        </LoginImage>
        <Frame>
          <FrameImage src="images/vector.png" alt="" />
          <Line></Line>
          <div>
            <FrameTitle>Welcome Back!</FrameTitle>
            <FramePara>
              Log in to continue and access all the features
            </FramePara>
          </div>
          <InputDiv>
            <AddInput>
              <CardLabel>Enter Email</CardLabel>
              <CardInput
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </AddInput>
            <AddInput>
              <CardLabel>Enter Password</CardLabel>
              <CardInput
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </AddInput>

            <CardButton
              disabled={!isActive}
              active={isActive}
              onClick={handleSubmit}
            >
              Login
            </CardButton>
          </InputDiv>
        </Frame>
      </Flex>
    </div>
  );
};

export default Login;
