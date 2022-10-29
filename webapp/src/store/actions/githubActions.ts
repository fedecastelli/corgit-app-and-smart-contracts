import {CaseReducer, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {PullRequest, PullRequestContributor, PullRequestState} from "../../utils/ProjectTypes/Project.types";
import {Octokit} from "@octokit/rest";
import axios, {AxiosResponse} from "axios";
import {GithubReducer} from "../reducers/github";

export const setPullRequest: CaseReducer<GithubReducer, PayloadAction<PullRequest>> =
    (state, action) => {
      state.pullRequest = action.payload;
    }
