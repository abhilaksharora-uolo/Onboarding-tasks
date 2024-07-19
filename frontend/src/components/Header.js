import React, { useEffect, useState } from "react";
import Down from "../utils/svg/Down";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../api/userService";
import toast from "react-hot-toast";
import SuccessModal from "./SuccessModal";
import { useAuth } from "../utils/AuthContext";
import Account from "../utils/svg/Account";

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
  const { logout } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getLoggedUser();
    if (data.data.ok) {
      setUser(data.data.res);
    } else {
      toast.error("Error in fetching user from database");
    }
  };

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
    logout();
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
            <Avataar
              src={user ? user.imageUrl : "images/G_Avator_1.png"}
              alt=""
            />
            <HeaderP>{user ? user.name : "Avataar"}</HeaderP>
            <DropdownButton onClick={toggleDropdown}>
              <Down />
            </DropdownButton>
            <Dropdown isOpen={dropdownOpen}>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </Flex>
          <AccountD>
            <Account />
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
