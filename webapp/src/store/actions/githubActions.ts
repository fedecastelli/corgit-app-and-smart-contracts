import {CaseReducer, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {PullRequest, PullRequestContributor, PullRequestState} from "../../utils/ProjectTypes/Project.types";
import {Octokit} from "@octokit/rest";
import axios, {AxiosResponse} from "axios";
import {GithubReducer} from "../reducers/github";

export const setContractAddress: CaseReducer<GithubReducer, PayloadAction<string>> =
    (state, action) => {
      state.githubRepoContractAddress = action.payload;
    }

export const getContractAddressFromGithubRepo = createAsyncThunk<string | undefined, {repoOwner: string, repoName: string}>(
    'github/getContractAddressFromGithubRepo',
    async (params, thunkAPI) => {
      const githubRawResponse: AxiosResponse = await axios.get(`https://raw.githubusercontent.com/${params.repoOwner}/${params.repoName}/master/.corgit.config`);
      if (githubRawResponse.status === 200) {
        const corgitConfig: {cgTokenAddress: string} = githubRawResponse.data;
        return corgitConfig.cgTokenAddress;
      } else return undefined;
    }
);

export const loadPullRequest = createAsyncThunk<PullRequest, {repoOwner: string, repoName: string, pullrequestNumber: number}>(
    'github/loadPullRequestContributors',
    async (params, thunkAPI) => {
      // run the GET calling the github sdk
      const octokit = new Octokit({});
      const pullRequestInformation = await octokit.rest.pulls.get({
        owner: params.repoOwner, repo: params.repoName, pull_number: params.pullrequestNumber});
      const commitsInformation = await octokit.rest.pulls.listCommits({
        owner: params.repoOwner, repo: params.repoName, pull_number: params.pullrequestNumber});
      const commits: {authorId: number, message: string, sha: string, url: string}[] =
          commitsInformation.data.map(commit => {
        return {authorId: commit.author.id, sha: commit.sha, message: commit.commit.message, url: commit.url};});
      // get unique contributors from commits
      const uniqueContributors: number[] = Array.from(new Set(commits.map(commit => {return commit.authorId; } )).values());
      const contributors: PullRequestContributor[] = [];
      uniqueContributors.forEach(contributorId => {
        let contributorInformation = commitsInformation.data.filter(contributor => { return contributor.author.id })[0];
        contributors.push({
          id: contributorId,
          username: contributorInformation.author.login as string,
          avatarUrl: contributorInformation.author.avatar_url as string,
          profileUrl: contributorInformation.author.url as string,
          commits: commits.filter(commit => { return commit.authorId === contributorId; }).map(commit => {
            return { message: commit.message, sha: commit.sha, url: commit.url };
          })
        });
      });
      const pullRequest: PullRequest = {
        id: pullRequestInformation.data.id,
        title: pullRequestInformation.data.title,
        closedAt: 0,
        state: pullRequestInformation.data.state as PullRequestState,
        contributors: contributors
      };
      return pullRequest;
    }
)
