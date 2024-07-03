import React, { useState } from "react";
import { addUser } from "../../api/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "../../utils/svg/ImageUpload";
import "./AddUser.css"

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [url, setUrl] = useState("");

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
      console.log("Reached");
      if (!validateEmail(email)) {
        toast.error("Email format incorrect");
        return;
      }
      const newUser = {
        name,
        email,
        // url,
      };
      const res = await addUser(newUser);
      if (res.data.ok) toast.success("User added successfully");
      else toast.error("Error in adding user");
      console.log(res);
    } catch (err) {
      toast.error(err);
    }
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <div>
      <ToastContainer />
      <div className="main">
        <div className="add-user">
          <h1 className="">Create Profile</h1>
          <div className="card">
            <div className="card-items">
              <label>Upload Photo</label>
              <p>Upload passport size photo</p>
              <ImageUpload />
              <div className="add-input">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="add-input">
                <label>Email - ID</label>
                <input
                  type="email"
                  placeholder="vikr@uolo.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="add-input">
                <label>Password</label>
                <input type="password" placeholder="*******" />
              </div>
              <div className="add-input">
                <label>Confirm Password</label>
                <input type="password" placeholder="*******" />
              </div> */}
            </div>
          </div>
          <div className="card-footer">
            <div className="card-footer-items">
              <button className="card-button-cancel">Cancel</button>
              <button
                className={`card-button ${
                  name && email ? "active" : "disabled"
                }`}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;