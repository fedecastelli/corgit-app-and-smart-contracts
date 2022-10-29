import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {routes} from "./App.Routes";
import {Web3Modal} from "@web3modal/react";
import {ConfigOptions} from "@web3modal/core";
import {chain} from "@wagmi/core";
import {providers} from "@web3modal/ethereum";


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
