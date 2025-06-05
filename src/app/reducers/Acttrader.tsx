import { createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { dispatch } from "../store";
import { ActTraderStateProps } from "@/types/acttrader";
import axios from "axios";

interface LoginResponse {
  data: {
    AtaccessToken: string;
    user: {
      username: string;
      password: string;
      accountType: string;
    };
  };
}

const initialState: ActTraderStateProps = {
  error: null,
  accounts: [],
};

const acttrader = createSlice({
  name: "acttrader",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAccountsSuccess(state, action) {
      state.accounts = action.payload;
    },
  },
});

export const { hasError, getAccountsSuccess } = acttrader.actions;

export function getAccounts({
  AtaccessToken,
  accountType,
}: {
  AtaccessToken: string;
  accountType: string;
}) {
  return async () => {
    try {
      // First attempt
      const res = await api.post("acttrader/all-accounts", {
        AtaccessToken,
        accountType,
      });

      const result = res.data?.data?.accounts?.result;
      console.log("result--------->",result);
      if (!result || !Array.isArray(result) || result.length === 0) {
        // Attempt to re-login if account list is empty
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        console.log("username---------->", username);
        if (!username || !password) {
          throw new Error("Missing credentials from localStorage");
        }

        const loginRes = await axios.post<LoginResponse>("acttrader/login", {
          username,
          password,
          accountType,
        });
        console.log("success✨")
        const newToken = loginRes.data.data.AtaccessToken;
        localStorage.setItem("AtaccessToken", newToken);
        localStorage.setItem("Atuser", JSON.stringify(loginRes.data.data.user));

        const retryRes = await api.post("acttrader/all-accounts", {
          AtaccessToken: newToken,
          accountType,
        });
        console.log("retryRes--------->", retryRes);
        const retryResult = retryRes.data?.data?.accounts?.result;

        dispatch(getAccountsSuccess(retryResult || []));
        console.log("✨ Refetched accounts:", retryResult);
      } else {
        dispatch(getAccountsSuccess(result));
        console.log("🥱 Fetched accounts:", result);
      }
    } catch (err) {
      console.error("❌ Error in getAccounts:", err);
      dispatch(hasError(err));
    }
  };
}

export default acttrader.reducer;
