import React from "react";
import Create1 from "../../utils/svg/Create1";
import Create2 from "../../utils/svg/Create2";
import Team1 from "../../utils/svg/Team1";
import Team2 from "../../utils/svg/Team2";
import "./Sidebar.css"

const Sidebar = ({ onItemClick, activeItem }) => {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-items">
          <button
            onClick={() => onItemClick(1)}
            className={`sidebar-item ${activeItem === 1 ? "clicked" : ""}`}
          >
            <div className="sidebar-inner-item">
              {activeItem === 1 ? (
                <>
                  <Team1 />
                </>
              ) : (
                <>
                  <Team2 />
                </>
              )}{" "}
              <p>All Team member</p>
            </div>
          </button>
          <button
            onClick={() => onItemClick(2)}
            className={`sidebar-item ${activeItem === 2 ? "clicked" : ""}`}
          >
            <div className="sidebar-inner-item">
              {activeItem === 2 ? (
                <>
                  <Create1 />
                </>
              ) : (
                <>
                  <Create2 />
                </>
              )}{" "}
              <p>Create Profile</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
