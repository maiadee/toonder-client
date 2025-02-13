import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/profiles";

export const profileIndex = async () => {
  try {
    const res = await axios.get(BASE_URL + `/index`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(res);
    return res.data || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const profileShow = async (profileId) => {
  try {
    const res = await axios.get(BASE_URL + `/${profileId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const profileCreate = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const profileUpdate = async (profileId, formData) => {
  try {
    const res = await axios.put(BASE_URL + `/${profileId}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const matchDelete = async (profileId) => {
  try {
    const res = await axios.delete(BASE_URL + `/matches/${profileId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("Match deleted successfully:", res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const profileLike = async (profileId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/${profileId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};

export const profileDislike = async (profileId) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/${profileId}/dislikes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error disliking profile:", error);
    throw error;
  }
};

export const matchesIndex = async (profileId) => {
  try {
    const res = await axios.get(BASE_URL + `/${profileId}/matches`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
