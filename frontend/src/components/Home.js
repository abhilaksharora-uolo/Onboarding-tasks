import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const SideLeft = styled.div`
  overflow: hidden;
  padding: 16px 0px;
  box-shadow: 2px 0 3px -1px rgba(0, 0, 0, 0.1);
  width: 17%;
  height: 130vh;
  position: sticky;

  @media (max-width: 1024px) {
    display: none;
    width: 0%;
  }
`;

const SideRight = styled.div`
  width: 83%;
  padding-top: 50px;
  height: max-content;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Home = () => {
  return (
    <div>
      <Header />
      <MainFlex className="hello">
        <SideLeft>
          <Sidebar />
        </SideLeft>
        <SideRight className="hello2">
          <Outlet />
        </SideRight>
      </MainFlex>
    </div>
  );
};

export default Home;
