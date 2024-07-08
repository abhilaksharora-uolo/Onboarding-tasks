import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userService";
import Search from "../utils/svg/Search";
import LeftArrow from "../utils/svg/LeftArrow";
import RightArrow from "../utils/svg/RightArrow";
import Profile from "./Profile";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

const TeamMain = styled.div`
  display: flex;
  flex-direction: row;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  padding: 10px;
`;

const TeamTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

const SearchD = styled.div`
  border-radius: 16px;
  border: 1px;
  border: 1px solid #d0d5dd;
  height: 48px;
  width: 1152px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  border: none;
  width: 1152px;
  height: 46px;
  padding: 0 15px;
  font-size: 16px;
  color: #98a2b3;
`;

const SearchButton = styled.button`
  height: 48px;
  width: 115px;
  padding: 13px 40px 13px 40px;
  border-radius: 0px 8px 8px 0px;
  border: 1px;
  background: #f6f6f6;
  border: 1px solid #d0d5dd;
`;

const TeamContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const TeamInnerComponent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;

const ControlButton = styled.button`
  border-radius: 8px;
  border: 1px solid #e2e2e2;
  width: 32px;
  height: 32px;
  text-align: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #561fe7;
    color: white;
  }

  &.active {
    background-color: #561fe7;
    color: white;
  }
`;

const ControlPara = styled.p`
  text-align: center;
  align-items: center;
  padding: 8px 0;
  margin: 0;
`;

const NoData = styled.div`
  text-align: center;
`;

const NoDataImg = styled.img`
  width: 500px;
  height: 500px;
  opacity: 40%;
  border-radius: 25px;
`;

const Limit = styled.select`
  border: 2px solid #561fe7;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 8px;
  width: max-content;
  height: 32px;
`;

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
          setUsers(res.data.res);
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
        <ControlButton
          key={i}
          className={`control ${i === page ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          <ControlPara>{i}</ControlPara>
        </ControlButton>
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
      <TeamMain>
        <Team>
          <TeamTitle>Our Team</TeamTitle>
          <SearchD>
            <Search />
            <SearchInput
              type="text"
              placeholder="Search by Name, or Email id"
            />
            <SearchButton>Search</SearchButton>
          </SearchD>

          <TeamContent>
            {users.length > 0 ? (
              <>
                <TeamInnerComponent>
                  {users.map((user, index) => {
                    return (
                      <div key={index}>
                        <Profile user={user} />
                      </div>
                    );
                  })}
                </TeamInnerComponent>
                <Pagination>
                  <ControlButton onClick={() => handlePrev()}>
                    <LeftArrow />
                  </ControlButton>
                  {renderPageButtons()}
                  <ControlButton onClick={() => handleNext()}>
                    <RightArrow />
                  </ControlButton>
                  <div>
                    <Limit
                      onChange={(e) => handleLimit(e)}
                      value={limit}
                    >
                      <option value={8}>Limit per page</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={16}>16</option>
                      <option value={20}>20</option>
                    </Limit>
                  </div>
                </Pagination>
              </>
            ) : (
              <NoData>
                <NoDataImg
                  width="24"
                  height="24"
                  src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1720024012~exp=1720027612~hmac=eecbbc5dd1c2c2fe883a1573412716a1e33c1ab9e3b1fa79e7a24ee4071aac61&w=1060"
                  alt="no-data-availible"
                />
              </NoData>
            )}
          </TeamContent>
        </Team>
      </TeamMain>
    </div>
  );
};

export default Users;