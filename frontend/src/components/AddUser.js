import React, { useState } from "react";
import { addUser } from "../api/userService";
import toast, { Toaster } from "react-hot-toast";
import ImageUpload from "../utils/svg/ImageUpload";
import styled from "styled-components";
import Delete from "../utils/svg/Delete";
import SuccessModal from "./SuccessModal";

const MainContainer = styled.div`
  background: #f6f6f6;
  display: flex;
  flex-direction: row;
  z-index: 98;
  font-family: "Open Sans";
  width: 100%;
  margin: 20px auto;
  @media (max-width: 1024px) {
    background: #ffffff;
  }
`;

const AddUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 125vh;
  margin: 20px auto 0px;
  @media (max-width: 1024px) {
    height: 100vh;
  }
`;

const AddUserInnerContainer = styled.div`
  margin: 0px auto;
`;

const AddInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 10px 0;

  @media (max-width: 1024px) {
    margin: 20px 0;
  }
`;

const Title = styled.h1`
  font-family: Outfit;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #101828;
`;

const Card = styled.div`
  background: #ffffff;
  border: 2px solid #eaecf0;
  // width: 460px;
  padding: 32px;
  border-radius: 20px 20px 0 0;

  @media (max-width: 1024px) {
    margin: 20px 0;
    border: none;
    // width: 328px;
    padding: 0px;
  }
`;

const CardItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: max-content;

  @media (max-width: 1024px) {
    // margin-left: 30px;
  }
`;

const CardItemsPara = styled.p`
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
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

  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

const CardInput = styled.input`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  font-family: "Open Sans";
  height: 20px;
  width: 430px;

  @media (max-width: 1024px) {
    height: 32px;
    width: 336px;
  }
`;

const CardFooter = styled.div`
  padding: 16px 32px;
  border-radius: 0 0 12px 12px;
  background: #ffffff;
  box-shadow: 0px -1px 2px 0px #00000014;
  @media (max-width: 1024px) {
    height: 32px;
    width: 336px;
    box-shadow: none;
  }
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

  @media (max-width: 1024px) {
    height: 44px;
  }
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

const MainFlex = styled.div`
  display: flex;
  flex-direction: row;
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
        <MainFlex>
          <MainContainer>
            <AddUserContainer className="abc">
              <AddUserInnerContainer>
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
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^a-zA-Z ]/g, "");
                          value = value.replace(/\s+/g, " ");
                          setName(value);
                        }}
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
              </AddUserInnerContainer>
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
        </MainFlex>
      </div>

      {modal ? (
        <>
          <SuccessModal text={"User has been successfully created"} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddUser;
