import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {setCgProjectInformation} from "../actions/cgProjectActions";

export interface CgProjectReducer extends BaseReducer {
  tokenName: string,
  tokenSymbol: string,
  tokenAddress: string,
  tokenTotalSupply: number,
  treasuryBalance: number,
  unclaimedRewards: number,
  collectedRewards: number,
  distributionReward: number,
  tokenValue: number,
  githubUrl: string
}

/** -- INITIAL STATE */

const initialState: CgProjectReducer = {
  tokenName: "",
  tokenSymbol: "",
  tokenAddress: "",
  tokenTotalSupply: 0,
  tokenValue: 0,
  treasuryBalance: 0,
  unclaimedRewards: 0,
  collectedRewards: 0,
  distributionReward: 0,
  githubUrl: ""
}

/** --- CREATE THE REDUCER */

export const cgProjectReducerSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearError,
    setCgProjectInformation,
  },
  extraReducers:
      (builder) => {

      }
});

export const cgProjectReducerActions = {
  setCgProjectInformation: cgProjectReducerSlice.actions.setCgProjectInformation
}

export default cgProjectReducerSlice.reducer
