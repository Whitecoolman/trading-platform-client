import { createSlice } from "@reduxjs/toolkit";
import acttraderapi from "@/utils/ActTraderApi";
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

export function getAccounts({token} : {token : string}) {
    return async () => {
        try {
            const response = await acttraderapi.post("acttrader/all-accounts", {
                token
            });
            dispatch(
                acttrader.actions.getAccountsSuccess(
                    response.data.data.accounts.accounts
                )
            );
        }
        catch(err) {
            dispatch(acttrader.actions.hasError(err));
        }
    }
}
export default acttrader.reducer;