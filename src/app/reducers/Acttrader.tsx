import { createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { dispatch } from "../store";
import { ActTraderStateProps } from "@/types/acttrader";

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

export function getAccounts({accessToken, accountType} : {accessToken : string, accountType: string}) {
    return async () => {
        try {
            const response = await api.post("acttrader/all-accounts", {
                accessToken,
                accountType
            });
            console.log("🥱 response", response);
            dispatch(
                acttrader.actions.getAccountsSuccess(
                    response.data.result
                )
            );
        }
        catch(err) {
            dispatch(acttrader.actions.hasError(err));
        }
    }
}
export default acttrader.reducer;