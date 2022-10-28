import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {githubReducerActions} from "./store/reducers/github";


function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const call = () => {
    dispatch(githubReducerActions.loadPullRequestContributors({
      repoOwner: "ledgerwatch", repoName: "erigon", pullrequestNumber: 5891}));
  };
  return (
      <div onClick={call}>
        ciao
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
