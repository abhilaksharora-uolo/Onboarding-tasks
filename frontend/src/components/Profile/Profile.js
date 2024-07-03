import React from "react";
import { deleteUser } from "../../api/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete from "../../utils/svg/Delete";
import "./Profile.css"

const Profile = ({ user }) => {
  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.ok) {
        // toast.success("Deleted successfully");
        console.log("deleted");
      } else {
        toast.error("Error in deleting user");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="profile">
        <img
          // src={user.url}
          src="https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__"
          alt="User"
        />
        <button className="delete-btn" onClick={(e) => handleDelete(user.id)}>
          <Delete />
        </button>
        <div className="profile-content">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
