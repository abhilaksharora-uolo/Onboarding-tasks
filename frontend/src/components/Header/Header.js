import React from "react";
import Avataar from "../../utils/svg/Avataar";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-flex">
        <img className="logo" src="images/vector.png" alt="" />
        <div className="flex">
          <img className="avataar" src="images/G_Avator_1.png" alt="" />
          <p>Vikarant</p>
          <Avataar />
        </div>
      </div>
    </div>
  );
};

export default Header;
