import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {routes} from "./App.Routes";
import {Web3Modal} from "@web3modal/react";
import {ConfigOptions} from "@web3modal/core";
import {chain} from "@wagmi/core";
import {providers} from "@web3modal/ethereum";


const web3ModalConfig: ConfigOptions = {
  projectId: '2ea279ee6e975cb61b9e09096d8e38ad',
  theme: "light",
  accentColor: 'default',
  ethereum: {
    appName: 'CorGit',
    chains: [
      chain.goerli
    ]
  }
}

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Web3Modal config={web3ModalConfig} />
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
