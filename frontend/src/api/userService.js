import axios from "axios";

const API_URL = "http://localhost:1000/api/v1/user";

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const cookiePair = cookie.split("=");
    const cookieName = cookiePair[0].trim();
    if (cookieName === name) {
      return cookiePair[1];
    }
  }
  return null;
}

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

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: { ok: false, res: [], message: err.message } };
  }
};

export const getLoggedUser = async () => {
  try {
    const token = getCookie("token");
    const res = await axios.get(`${API_URL}/logged`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return { data: { ok: false, res: [] } };
  }
};
