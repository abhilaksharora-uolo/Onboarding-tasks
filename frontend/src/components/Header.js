import React, { useEffect, useState } from "react";
import Down from "../utils/svg/Down";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import Account from "../utils/svg/Account";
import removeCookie from "react-cookie";

const HeaderMain = styled.div`
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #ffffff;

  @media (max-width: 1024px) {
    height: 64px;
    z-index: 98;
  }
`;

const HeaderFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;

  @media (max-width: 1024px) {
    align-items: center;
    height: 64px;
  }
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
  border-radius: 50%;
`;

const Logo = styled.img`
  width: 70px;
  height: 24px;
  @media (max-width: 1024px) {
    height: 32px;
    width: 95px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Ham = styled.button`
  border: none;
  background: none;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const AccountD = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Hamimg = styled.img`
  width: 36px;
  height: 36px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 29%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
`;

const Dropdown = styled.div`
  position: absolute;
  width: 100px;
  top: 45px;
  right: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  border-radius: 10px;
  text-align: center;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const DropdownButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("Avataar");
  const [imageUrl, setImageUrl] = useState("images/G_Avator_1.png");

  useEffect(() => {
    if (localStorage.getItem("name") && localStorage.getItem("imageUrl")) {
      setName(localStorage.getItem("name"));
      setImageUrl(localStorage.getItem("imageUrl"));
    }
  }, []);

  const handleSidebar = async () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 1024) {
      setSidebar(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("name");
    localStorage.removeItem("imageUrl");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div>
      <HeaderMain>
        <HeaderFlex>
          <Ham onClick={handleSidebar}>
            <Hamimg
              src="https://img.icons8.com/ios-filled/50/menu--v6.png"
              alt="menu--v6"
            />
          </Ham>
          <Logo src="images/vector.png" alt="" />
          <Flex>
            <Avataar src={imageUrl} alt="" />
            <HeaderP>{name}</HeaderP>
            <DropdownButton onClick={toggleDropdown}>
              <Down />
            </DropdownButton>
            <Dropdown isOpen={dropdownOpen}>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </Flex>
          <AccountD>
            {imageUrl ? <Avataar src={imageUrl} alt="" /> : <Account />}
          </AccountD>
        </HeaderFlex>
      </HeaderMain>
      {sidebar && (
        <>
          <Sidebar closeSidebar={closeSidebar} />
          <Backdrop onClick={closeSidebar} />
        </>
      )}
      {modal ? (
        <>
          <SuccessModal text={"You have been successfully logout"} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
