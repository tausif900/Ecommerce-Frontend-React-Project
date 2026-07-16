import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});
//

// interceptors is used to intercept the request and add the token to the header
// token is stored in local storage

// interceptors will run with all request

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
