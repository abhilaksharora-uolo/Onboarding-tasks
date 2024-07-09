import axios from "axios";

const API_URL = "http://localhost:1000/api/v1/user";

export const addUser = async (formData) => {
  try {
    const res = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (page, limit) => {
  try {
    const res = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
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
