import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Users from "./Users";
import AddUser from "./AddUser";
import styled from "styled-components";

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
`;

const SideRight = styled.div`
  width: 83%;
  padding-top: 50px;
  height: max-content;
`;

const Home = () => {
  const [item, setItem] = useState(1);
  const handleItem = (id) => {
    setItem(id);
  };
  const renderComponent = () => {
    switch (item) {
      case 1:
        return <Users />;
      case 2:
        return <AddUser />;
      default:
        return <Users />;
    }
  };
  return (
    <div>
      <Header />
      <MainFlex>
        <SideLeft>
          <Sidebar onItemClick={handleItem} activeItem={item} />
        </SideLeft>
        <SideRight>{renderComponent()}</SideRight>
      </MainFlex>
    </div>
  );
};

export default Home;
