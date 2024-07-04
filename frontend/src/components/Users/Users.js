import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/userService";
import Search from "../../utils/svg/Search";
import LeftArrow from "../../utils/svg/LeftArrow";
import RightArrow from "../../utils/svg/RightArrow";
import Profile from "../Profile/Profile";
import toast, { Toaster } from "react-hot-toast";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers(page, limit);
        if (res.data.ok) {
          console.log(res.data.results);
          setUsers(res.data.results);
          setTotalPages(res.data.totalPages);
        } else {
          toast.error("Error in fetching users from database");
        }
      } catch (err) {
        toast.error(err);
      }
    };
    fetchUsers();
  }, [limit, page]);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`control ${i === page ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          <p>{i}</p>
        </button>
      );
    }
    return buttons;
  };

  const handlePrev = () => {
    if (page <= 1) setPage(totalPages);
    else setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
    else setPage(1);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div>
      <Toaster />
      <div className="team-main">
        <div className="team">
          <h3>Our Team</h3>
          <div className="search">
            <Search />
            <input type="text" placeholder="Search by Name, or Email id" />
            <button>Search</button>
          </div>

          <div className="team-content">
            {users.length > 0 ? (
              <>
                <div className="team-inner-content">
                  {users.map((user, index) => {
                    return (
                      <div className="team-inner-card" key={index}>
                        <Profile user={user} />
                      </div>
                    );
                  })}
                </div>
                <div className="pagination">
                  <button onClick={() => handlePrev()} className="control">
                    <LeftArrow />
                  </button>
                  {renderPageButtons()}
                  <button onClick={() => handleNext()} className="control">
                    <RightArrow />
                  </button>
                  <div className="pagination-select">
                    <select
                      onChange={(e) => handleLimit(e)}
                      value={limit}
                      className="limit"
                    >
                      <option value={8}>Limit per page</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={16}>16</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-data">
                <img
                  width="24"
                  height="24"
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1720024012~exp=1720027612~hmac=eecbbc5dd1c2c2fe883a1573412716a1e33c1ab9e3b1fa79e7a24ee4071aac61&w=1060"
                  alt="no-data-availible"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
