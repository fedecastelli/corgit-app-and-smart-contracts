import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {routes} from "./App.Routes";
import {chain} from "@wagmi/core";
import {createClient, WagmiConfig} from "wagmi";
import {getDefaultProvider} from "ethers";


const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App(): JSX.Element {

  return (
    <WagmiConfig client={client}>
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
    </WagmiConfig>
  );

}

export default App;
