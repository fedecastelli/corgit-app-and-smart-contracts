import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {theme} from "./GlobalStyles";
import {Web3Modal} from "@web3modal/react";
import {ConfigOptions} from "@web3modal/core";
import {chain} from "@wagmi/core";
import { getDefaultProvider } from 'ethers';
import {providers} from "@web3modal/ethereum";

// export const goarliCustomTestnet = {
//   id: 5,
//   name: "Goerli",
//   network: "goerli",
//   nativeCurrency: {
//     decimals: 18,
//     name: "GoerliETH",
//     symbol: "GoerliETH",
//   },
//   rpcUrls: {
//     default: "---",
//   },
//   blockExplorers: {
//     default: {
//       name: "Goerli explorer",
//       url: "https://blockscout.chiadochain.net",
//     },
//   },
//   testnet: true,
// };

const web3ModalConfig: ConfigOptions = {
  projectId: '2ea279ee6e975cb61b9e09096d8e38ad',
  theme: "light",
  accentColor: 'default',
  ethereum: {
    appName: 'CorGit',
    autoConnect: true,
    chains: [
      // goarliCustomTestnet
      chain.goerli
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: "2ea279ee6e975cb61b9e09096d8e38ad",
      }),
    ],
  }
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Web3Modal config={web3ModalConfig} />
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
