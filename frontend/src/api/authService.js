import axios from "axios";
import { getCookie } from "../utils/getCookie";

const API_URL = "http://localhost:1000/api/v1/user";

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
