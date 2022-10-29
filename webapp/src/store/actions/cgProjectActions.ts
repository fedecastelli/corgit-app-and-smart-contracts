import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {CgProjectReducer} from "../reducers/cgProject";

export const setCgProjectInformation: CaseReducer<CgProjectReducer, PayloadAction<{githubUrl: string, tokenAddress: string}>> =
    (state, action) => {
      state.githubUrl = action.payload.githubUrl;
      state.tokenAddress = action.payload.tokenAddress
    };
