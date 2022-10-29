import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {CgProjectReducer} from "../reducers/cgProject";


export const setTokenAddress: CaseReducer<CgProjectReducer, PayloadAction<string>> =
    (state, action) => {
      state.tokenAddress = action.payload;
    };
