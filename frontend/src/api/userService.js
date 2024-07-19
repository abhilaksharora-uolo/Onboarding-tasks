import axios from "axios";
import { getCookie } from "../utils/getCookie";

const API_URL = "http://localhost:1000/api/v1/user";

export const addUser = async (formData) => {
  try {
    const token = getCookie("token");
    const res = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: { ok: false, res: [] } };
  }
};

export const getUsers = async (searchText, page, limit) => {
  try {
    const token = getCookie("token");
    const res = await axios.get(
      `${API_URL}/?q=${searchText}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: { ok: false, res: [] } };
  }
};

export const deleteUser = async (id) => {
  try {
    const token = getCookie("token");
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: { ok: false, res: [] } };
  }
};
