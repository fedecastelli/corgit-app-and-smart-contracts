import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {githubReducerActions} from "./store/reducers/github";
import {useSearchCgProject} from "./hooks/useSearchCgProject";
import {useGetPullRequestDetails} from "./hooks/useGetPullRequestDetails";


function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const addressStore = useAppSelector(state => state.cgProject.tokenAddress);
  const githubUrl = useAppSelector(state => state.cgProject.githubUrl);
  // const {loading, address, error, checkNow} = useSearchCgProject("git@github.com:fedecastelli/corgit-test-hello-world.git");
  const pullRequestGithubUrl = "https://github.com/ledgerwatch/erigon/pull/5897";
  const {loading, pullRequestUrl, error, checkNow} = useGetPullRequestDetails(pullRequestGithubUrl);
  const call = () => {
    // dispatch(githubReducerActions.getContractAddressFromGithubRepo({
    //   repoOwner: "fedecastelli", repoName: "corgit-test-hello-world"}));
  };
  return (
      // <div onClick={() => {checkNow("git@github.com:fedecastelli/corgit-test-hello-world.git")}}>
      // ciao {address}
      <div onClick={() => {checkNow(pullRequestGithubUrl)}}>
        ciao {pullRequestUrl}<br></br>
        {addressStore}<br></br>
        {githubUrl}
      </div>
  );
  /*
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map(r => {
            if(r.protected)
              return <Route path={r.path} key={r.path} element={r.component} />
            else return <Route path={r.path} key={r.path} element={r.component} />
          })
        }
      </Routes>
    </BrowserRouter>
  );
   */

}

export default App;
