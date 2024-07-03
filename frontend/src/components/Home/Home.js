import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Users from "../Users/Users";
import AddUser from "../AddUser/AddUser";
import "./Home.css";

const Home = () => {
  const [item, setItem] = useState(1);
  const handleItem = (id) => {
    setItem(id);
  };
  const renderComponent = () => {
    switch (item) {
      case 1:
        return <Users />;
      case 2:
        return <AddUser />;
      default:
        return <Users />;
    }
  };
  return (
    <div>
      <Header />
      <div className="main-flex">
        <div className="side-left">
          <Sidebar onItemClick={handleItem} activeItem={item} />
        </div>
        <div className="side-right">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Home;
