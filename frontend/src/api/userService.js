import axios from "axios";

const API_URL = "http://localhost:1000/api/v1/user";

export const addUser = async (user) => {
  try {
    const res = await axios.post(API_URL, user);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (page) => {
  try {
    const res = await axios.get(`${API_URL}/?page=${page}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
