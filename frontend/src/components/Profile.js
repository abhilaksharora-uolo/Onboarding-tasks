import React from "react";
import { deleteUser } from "../api/userService";
import toast, { Toaster } from "react-hot-toast";
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

const Profile = ({ user }) => {
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.ok) {
        toast.success("Deleted successfully");
      } else {
        toast.error("Error in deleting user");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div>
      <Toaster />
      <ProfileD>
        <ProfileImg
          src={user.imageUrl}
          // src="https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__"
          alt="User"
        />
        <DeleteButton
          className="delete-btn"
          onClick={(e) => handleDelete(user._id)}
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
