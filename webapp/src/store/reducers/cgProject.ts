import {BaseReducer} from "./index";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {setCgProjectInformation} from "../actions/cgProjectActions";

export interface CgProjectReducer extends BaseReducer {
  tokenAddress: string,
  githubUrl: string
}

/** -- INITIAL STATE */

const initialState: CgProjectReducer = {
  tokenAddress: "",
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
