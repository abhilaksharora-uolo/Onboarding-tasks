import React from "react";
import Create1 from "../utils/svg/Create1";
import Create2 from "../utils/svg/Create2";
import Team1 from "../utils/svg/Team1";
import Team2 from "../utils/svg/Team2";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarD = styled.div`
  margin-top: 60px;
  width: 17%;
  height: 150vh;
  position: fixed;
  z-index: 99;
`;

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const SidebarItem = styled(Link)`
  background: #ffffff;
  border: none;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  text-decoration: none;

  &.clicked {
    color: #561fe7;
    background: #eee9fd;
    border: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #667085;
  }

  &.clicked p {
    color: #561fe7;
  }
`;

const SidebarItemPara = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #667085;
  margin-left: 7px;
  font-family: "Open Sans";
`;

const SidebarInnerItem = styled.div`
  padding: 0 7px;
  display: flex;
  flex-direction: row;
`;

const Sidebar = ({ activeItem }) => {
  return (
    <div>
      <SidebarD>
        <SidebarItems>
          <SidebarItem
            to={"/"}
            className={`sidebar-item ${activeItem === 1 ? "clicked" : ""}`}
          >
            <SidebarInnerItem>
              {activeItem === 1 ? (
                <>
                  <Team1 />
                </>
              ) : (
                <>
                  <Team2 />
                </>
              )}{" "}
              <SidebarItemPara>All Team Member</SidebarItemPara>
            </SidebarInnerItem>
          </SidebarItem>
          <SidebarItem
            to={"/add-user"}
            className={`sidebar-item ${activeItem === 2 ? "clicked" : ""}`}
          >
            <SidebarInnerItem>
              {activeItem === 2 ? (
                <>
                  <Create1 />
                </>
              ) : (
                <>
                  <Create2 />
                </>
              )}{" "}
              <SidebarItemPara>Create Profile</SidebarItemPara>
            </SidebarInnerItem>
          </SidebarItem>
        </SidebarItems>
      </SidebarD>
    </div>
  );
};

export default Sidebar;
