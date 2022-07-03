import axios from "axios";
import jwtDecode from "jwt-decode";
import { URL } from "../../config";
import storage from "./storage";
const API_URL = URL + "/users/";
const API_URL_ACCOUNTS = URL + "/accounts/";

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  const user = jwtDecode(response.data);
  await storage.storeToken(response.data);
  return user;
};
// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  const user = jwtDecode(response.data);
  await storage.storeToken(response.data);
  return user;
};
// logout user
const logout = async () => {
  await storage.removeToken();
};

const getUserAccounts = async () => {
  const token = await storage.getToken();
  const response = await axios.get(API_URL + "me", {
    headers: {
      "x-auth-token": token,
    },
  });
  const accounts = response.data[0].accounts;
  return accounts;
};

const authService = {
  register,
  login,
  logout,
  getUserAccounts,
};
export default authService;
