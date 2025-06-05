import { createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { dispatch } from "../store";
import { ActTraderStateProps } from "@/types/acttrader";
import axios from "axios";

interface LoginResponse {
  data: {
    AtaccessToken: string;
    user: {
      email: string;
      password: string;
      accountType: string;
    };
  };
}

const initialState : ActTraderStateProps = {
    error : null,
    accounts : [],
}

const acttrader = createSlice({
    name : "acttrader",
    initialState,
    reducers : {
        hasError(state, action){
            state.error = action.payload;
        },
        getAccountsSuccess(state, action){
            state.accounts = action.payload;
        }
    }
})

export const { hasError, getAccountsSuccess} = acttrader.actions;



export function getAccounts({AtaccessToken, accountType} : { AtaccessToken : string, accountType: string}) {
    return async () => {
        try {
            const response = await api.post("acttrader/all-accounts", {
                AtaccessToken,
                accountType
            });
            console.log("🥱 response", response.data.data.accounts.result);
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            if (response.data.data.accounts.result == "undefined") {
                const response = await axios.post<LoginResponse>("acttrader/login", {
                    username,
                    password,
                    accountType,
                  });
                  const AtaccessToken = response.data.data.AtaccessToken;
                  localStorage.setItem("AtaccessToken", AtaccessToken);
                  localStorage.setItem("Atuser", JSON.stringify(response.data.data.user));
                  const response2 = await api.post("acttrader/all-accounts", {
                        AtaccessToken,
                        accountType
                    });
                    console.log("✨ response", response2.data.data.accounts.result);
                    dispatch(
                        acttrader.actions.getAccountsSuccess(
                            response2.data.data.accounts.result
                        )
                    )
            }
            dispatch(
                acttrader.actions.getAccountsSuccess(
                    response.data.data.accounts.result
                )
            );
        }
        catch(err) {
            dispatch(acttrader.actions.hasError(err));
        }
    }
}

export default acttrader.reducer;