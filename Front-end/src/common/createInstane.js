import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create({
    withCredentials: true,
  });
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        console.log("data", data.accessToken);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
