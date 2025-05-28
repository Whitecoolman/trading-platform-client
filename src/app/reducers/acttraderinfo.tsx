import { createSlice } from "@reduxjs/toolkit";
import ActTraderapi from "@/utils/ActTraderapi";
import { dispatch } from "../store";

import { ActTraderInfoStateProps } from "@/types/acttrader";
const initialState : ActTraderInfoStateProps = {
    error : null,
    accountInfo : [],
}

const acttraderInfo = createSlice({
    name : "traderlockerInfo",
    initialState,
    reducers : {
        hasError(state, action) {
            state.error = action.payload;
        },
        getAccountsInfoSuccess(state, action){
            const isPayloadExist = state.accountInfo.some(
                (accountInfo) => 
                    JSON.stringify(accountInfo) === JSON.stringify(action.payload)
            );

            if(!isPayloadExist) {
                state.accountInfo = [...state.accountInfo, action.payload];
            }
        }
    }
})

export const {hasError, getAccountsInfoSuccess} = acttraderInfo.actions;

export default acttraderInfo.reducer;