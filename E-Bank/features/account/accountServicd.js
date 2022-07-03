import axios from "axios";
import jwtDecode from "jwt-decode";
import { URL } from "../../config";
import storage from "../auth/storage";
const API_URL = URL + "/accounts/";

const addAccount = async (accountData) => {
  const token = await storage.getToken();
  const response = await axios.post(API_URL, accountData, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

const transferMoney = async (accountData) => {
  const token = await storage.getToken();
  const response = await axios.put(
    API_URL + "transfer/" + accountData.id,
    accountData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

const chargeMoney = async (accountData) => {
  const token = await storage.getToken();
  const response = await axios.put(
    API_URL + "charge/" + accountData.id,
    accountData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

const depositMoney = async (accountData) => {
  const token = await storage.getToken();
  console.log("accountData", accountData);
  const response = await axios.put(
    API_URL + "deposit/" + accountData.id,
    accountData,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};
const accountService = {
  addAccount,
  transferMoney,
  chargeMoney,
  depositMoney,
};
export default accountService;
