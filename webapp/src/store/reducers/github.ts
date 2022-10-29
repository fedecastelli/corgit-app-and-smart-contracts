import {BaseReducer} from "./index";
import {Prices, Proof, ProofToMint, PullRequest} from "../../utils/ProjectTypes/Project.types";
import {createSlice} from "@reduxjs/toolkit";
import {clearError} from "../actions/basicActions";
import {ErrorsEnum} from "../../utils/ProjectTypes/Errors.enum";
import {getContractAddressFromGithubRepo, loadPullRequest, setContractAddress} from "../actions/githubActions";

export interface GithubReducer extends BaseReducer {
  githubRepoContractAddress: string | undefined,
  pullRequest: PullRequest,
  mintedProofs: Proof[],
  mintedProofsLoading: boolean,
  proofToBeMinted: ProofToMint[],
  proofsToBeMintedHasEvaluationPending: boolean,
  uploadingFileToPublish: boolean,
  newProofActiveStep: number,
  mintingTx: string,
  price: Prices | undefined
}

/** -- INITIAL STATE */

const initialState: GithubReducer = {
  dispatchError: undefined,
  githubRepoContractAddress: undefined,
  pullRequest: undefined,
  mintedProofsLoading: false,
  mintedProofs: [],
  proofToBeMinted: [],
  proofsToBeMintedHasEvaluationPending: false,
  uploadingFileToPublish: false,
  newProofActiveStep: 0,
  mintingTx: "",
  price: undefined
};

/** --- CREATE THE REDUCER */

export const githubReducerSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    clearError,
    setContractAddress
  },
  extraReducers:
      (builder) => {

        /** Github pull request contributors */
        builder.addCase(loadPullRequest.fulfilled, (state, action) => {
          state.pullRequest = action.payload;
        })
        builder.addCase(loadPullRequest.rejected, (state, action) => {
          state.dispatchError = { code: ErrorsEnum.PROOF_0005, message: "", action: "github/loadPullRequestContributors"};
        })

        /** Github repository Corgit configuration **/
        builder.addCase(getContractAddressFromGithubRepo.fulfilled, (state, action) => {
          state.githubRepoContractAddress = action.payload;
        })
        builder.addCase(getContractAddressFromGithubRepo.rejected, (state, action) => {
          state.dispatchError = { code: ErrorsEnum.PROOF_0005, message: "", action: "github/getContractAddressFromGithubRepo"};
        })
      }
  }
);

export const githubReducerActions = {
  setContractAddress: githubReducerSlice.actions.setContractAddress,
  getContractAddressFromGithubRepo: getContractAddressFromGithubRepo,
  loadPullRequestContributors: loadPullRequest
}

export default githubReducerSlice.reducer
