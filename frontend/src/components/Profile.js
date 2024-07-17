import React from "react";
import { Toaster } from "react-hot-toast";
import Delete from "../utils/svg/Delete";
import styled from "styled-components";

const ProfileD = styled.div`
  border-radius: 16px;
  border: 1px 0px 0px 0px;
  border: 1px solid #e2e2e2;
  width: 270px;
  height: 366px;
  background: #f6f6f6;
  margin: 10px;
  overflow: hidden;
  position: relative;
  font-family: Outfit;

  &:hover {
    .delete-btn {
      visibility: visible;
    }
`;

const DeleteButton = styled.button`
  top: 5px;
  right: 5px;
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  visibility: hidden;
`;

const ProfileImg = styled.img`
  width: 270px;
  height: 270px;
  z-index: 1;
`;

const ProfileTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #101828;
  margin: 0;
`;

const ProfilePara = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: #101828;
  margin: 0;
`;

const ProfileContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const Profile = ({ user, onDelete }) => {
  console.log(user)
  return (
    <div>
      <Toaster />
      <ProfileD>
        <ProfileImg src={user.imageUrl} alt="User" />
        <DeleteButton
          className="delete-btn"
          onClick={(e) => onDelete(user.mongoId)}
        >
          <Delete />
        </DeleteButton>
        <ProfileContent>
          <ProfileTitle>{user.name}</ProfileTitle>
          <ProfilePara>{user.email}</ProfilePara>
        </ProfileContent>
      </ProfileD>
    </div>
  );
};

export default Profile;
