import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {githubReducerActions} from "./store/reducers/github";
import {useSearchCgProject} from "./hooks/useSearchCgProject";
import {routes} from "./App.Routes";


function App(): JSX.Element {

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

}

export default App;
