import React, { useState } from "react";
import { addUser } from "../api/userService";
import toast, { Toaster } from "react-hot-toast";
import ImageUpload from "../utils/svg/ImageUpload";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Delete from "../utils/svg/Delete";

const MainContainer = styled.div`
  background: #f6f6f6;
  display: flex;
  flex-direction: row;
  z-index: 98;
  font-family: "Open Sans";
`;

const AddUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  height: 900px;
`;

const AddInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Title = styled.h1`
  font-family: Outfit;
  font-size: 32px;
  font-weight: 700;
  line-height: 40.32px;
  letter-spacing: 0.25px;
  text-align: left;
  color: #101828;
`;

const Card = styled.div`
  background: #ffffff;
  border: 2px solid #eaecf0;
  width: 460px;
  padding: 32px;
  border-radius: 20px 20px 0 0;
`;

const CardItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardItemsPara = styled.p`
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
  line-height: 16.34px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  margin: 0;
  color: #667085;
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
`;

const CardFooter = styled.div`
  width: 460px;
  padding: 16px 32px;
  border-radius: 0 0 12px 12px;
  background: #ffffff;
  box-shadow: 0px -1px 2px 0px #00000014;
`;

const CardButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;
  border: none;

  background: ${({ active }) => (active ? "#561fe7" : "#98a2b3")};
  color: white;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
`;

const CardButtonCancel = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: 1px 0px 0px 0px;
  background: #ffffff;
  border: 1px solid #561fe7;
  margin: 0 10px;
  color: #561fe7;
  cursor: pointer;
`;

const CardFooterItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const LabelInput = styled.label`
  cursor: pointer
  background-color: black;
  width: fit-content;
  margin-top: 10px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ModalMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Modal = styled.div`
  width: 400px;
  height: 224px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ModalImg = styled.img`
  width: 80px;
  height: 80px;
`;

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

const ImagePrev = styled.img`
  width: 156px;
  height: 156px;
  border-radius: 50%;
`;

const ImagePrevPara = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
  text-align: center;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Prev = styled.div`
  position: relative;
  display: inline-block;
  width: 156px;
  height: 176px;
`;

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        toast.error("Name is required");
        return;
      }
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Email format incorrect");
        return;
      }
      if (!file) {
        toast.error("Profile picture is required");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password doesn't match");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", file);
      const res = await addUser(formData);
      if (res.data.ok && res.data.error) {
        toast.error(res.data.error);
      } else if (res.data.ok) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
        }, 3000);
      } else toast.error("Error in adding user");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFile();
    } catch (err) {
      toast.error(err);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0] && e.target.files[0].size > 1 * 1024 * 1024) {
      toast.error("Try adding profile picture less than 1 mb file");
      return;
    }
    setFile(e.target.files[0]);
    const blobUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(blobUrl);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFile();
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isActive = name && email && password && confirmPassword && file;

  return (
    <div>
      <Toaster />
      <div>
        <Header />
        <MainFlex>
          <SideLeft>
            <Sidebar activeItem={2} />
          </SideLeft>
          <SideRight>
            <MainContainer>
              <AddUserContainer>
                <Title>Create Profile</Title>
                <Card>
                  <CardItems>
                    <CardLabel>Upload Photo</CardLabel>
                    <CardItemsPara>Upload passport size photo</CardItemsPara>
                    <LabelInput>
                      {!file ? (
                        <>
                          {" "}
                          <ImageInput
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => handleFileChange(e)}
                          />
                          <ImageUpload />
                        </>
                      ) : (
                        <>
                          <Prev>
                            <DeleteButton
                              onClick={() => {
                                setFile();
                              }}
                            >
                              <Delete />
                            </DeleteButton>
                            <ImagePrev src={preview} alt="Preview" />
                            <ImagePrevPara>{file.name}</ImagePrevPara>
                          </Prev>
                        </>
                      )}
                    </LabelInput>
                    <AddInput>
                      <CardLabel>Name</CardLabel>
                      <CardInput
                        type="text"
                        value={name}
                        placeholder="Enter full name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </AddInput>
                    <AddInput>
                      <CardLabel>Email - ID</CardLabel>
                      <CardInput
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </AddInput>
                    <AddInput>
                      <CardLabel>Password</CardLabel>
                      <CardInput
                        type="password"
                        value={password}
                        placeholder="*******"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </AddInput>
                    <AddInput>
                      <CardLabel>Confirm Password</CardLabel>
                      <CardInput
                        type="password"
                        value={confirmPassword}
                        placeholder="*******"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </AddInput>
                  </CardItems>
                </Card>
                <CardFooter>
                  <CardFooterItems>
                    <CardButtonCancel onClick={handleCancel}>
                      Cancel
                    </CardButtonCancel>
                    <CardButton
                      disabled={!isActive}
                      active={isActive}
                      onClick={handleSubmit}
                    >
                      Save
                    </CardButton>
                  </CardFooterItems>
                </CardFooter>
              </AddUserContainer>
            </MainContainer>
          </SideRight>
        </MainFlex>
      </div>

      {modal ? (
        <ModalMain>
          <Modal>
            <ModalImg
              src="https://s3-alpha-sig.figma.com/img/afe4/9163/c8cd31c37cf6a026d0c095699cebe9f2?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jrKqvYqN-t2z4xSd7fs3LeNhnCFNO34HGGFE8SY3iRpDRxnMnbAYsPo6gTClKlXmxnnrbU9t71XouNw0oqGNCm7c0oNOU-lhk3F3MNT804xV32goNImV-wzzyzpyktvek~4HUEpLP5ncMqWNIq8DB5zOCpQLDHeOFdZDZkeS4jGP8hkQi8LAgPo3tptQtD9Dkqc2esQ2B0nwtVeodlL2-eURil~3NGLdQM92EqRzV3-wqkM-JVW-lwTonswABLP9FffKT2mzDitT0nBlHdee1aZSvzKjt32-WfftmJPnd48RZQL5KCUafSwpkVmYQ~kY4hRVE-1TpnY~8tTYxlVByw__"
              alt="success"
            />
            <p>User has been successfully created</p>
          </Modal>
        </ModalMain>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddUser;
