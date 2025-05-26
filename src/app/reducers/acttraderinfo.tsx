import { createSlice } from "@reduxjs/toolkit";
import ActTraderapi from "@/utils/ActTraderApi";
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

export function getAccountInfo({} : {}){
    return async () => {
        try{
            const response = await ActTraderapi.post ("actrader/info", {

            })
            dispatch(
                acttraderInfo.actions.getAccountsInfoSuccess(response.data.data)
            )
        } catch(err) {
            dispatch(acttraderInfo.actions.hasError(err));
        }
    }
}

export default acttraderInfo.reducer;