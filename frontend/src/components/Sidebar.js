import React, { useState } from "react";
import Create1 from "../utils/svg/Create1";
import Create2 from "../utils/svg/Create2";
import Team1 from "../utils/svg/Team1";
import Team2 from "../utils/svg/Team2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Logout from "../utils/svg/Logout";

const SidebarD = styled.div`
  margin-top: 60px;
  width: 17%;
  height: 150vh;
  position: fixed;
  z-index: 999;
  background: #ffffff;

  @media (max-width: 1024px) {
    width: 295px;
    top: 0;
    left: 0;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SidebarMain = styled.div`
  @media (max-width: 1024px) {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
  }
`;

const SidebarImg = styled.img`
  width: 95px;
  height: 32px;
  margin: 100px 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const SidebarItems = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SidebarItem = styled.button`
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

  @media (max-width: 1024px) {
    align-items: center;
    height: 72px;
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

const SidebarFooter = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 20px;
    left: 20px;
  }
`;

const SidebarButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  color: #667085;
  border: none;
  background: none;
`;

const Sidebar = ({ closeSidebar }) => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-restricted-globals
  const activeItem = location.pathname.includes("add-user");
  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 1024) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("name");
    localStorage.removeItem("imageUrl");
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 3000);
    navigate("/login");
  };

  return (
    <SidebarMain>
      <SidebarD>
        <SidebarImg src="images/vector.png" alt="logo" />
        <SidebarItems>
          <SidebarItem
            onClick={() => handleNavigate("/")}
            className={`sidebar-item ${!activeItem ? "clicked" : ""}`}
          >
            <SidebarInnerItem>
              {!activeItem ? (
                <>
                  <Team1 />
                </>
              ) : (
                <>
                  <Team2 />
                </>
              )}
              <SidebarItemPara>All Team Member</SidebarItemPara>
            </SidebarInnerItem>
          </SidebarItem>
          <SidebarItem
            onClick={() => handleNavigate("/add-user")}
            className={`sidebar-item ${activeItem ? "clicked" : ""}`}
          >
            <SidebarInnerItem>
              {activeItem ? (
                <>
                  <Create1 />
                </>
              ) : (
                <>
                  <Create2 />
                </>
              )}
              <SidebarItemPara>Create Profile</SidebarItemPara>
            </SidebarInnerItem>
          </SidebarItem>
        </SidebarItems>
        <SidebarFooter>
          <Logout />
          <SidebarButton onClick={handleLogout}>Logout</SidebarButton>
        </SidebarFooter>
      </SidebarD>
      {modal ? (
        <>
          <SuccessModal text={"You have been successfully logout"} />
        </>
      ) : (
        <></>
      )}
    </SidebarMain>
  );
};
export default Sidebar;
