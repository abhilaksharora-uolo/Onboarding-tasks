import React from "react";
import Down from "../utils/svg/Down";
import styled from "styled-components";

const HeaderMain = styled.div`
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #ffffff;
`;

const HeaderFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
`;

const HeaderP = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  color: #344054;
  padding: 0 10px;
`;

const Avataar = styled.img`
  width: 40px;
  height: 40px;
  padding: 0 10px;
`;

const Logo = styled.img`
  width: 70px;
  height: 24px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderMain>
      <HeaderFlex>
        <Logo src="images/vector.png" alt="" />
        <Flex>
          <Avataar src="images/G_Avator_1.png" alt="" />
          <HeaderP>Vikarant</HeaderP>
          <Down />
        </Flex>
      </HeaderFlex>
    </HeaderMain>
  );
};

export default Header;
