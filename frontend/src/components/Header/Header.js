import React from "react";
import "./Header.css";
import Down from "../../utils/svg/Down";

const Header = () => {
  return (
    <div className="header">
      <div className="header-flex">
        <img className="logo" src="images/vector.png" alt="" />
        <div className="flex">
          <img className="avataar" src="images/G_Avator_1.png" alt="" />
          <p>Vikarant</p>
          <Down /> 
        </div>
      </div>
    </div>
  );
};

export default Header;
