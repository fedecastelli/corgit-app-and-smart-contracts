import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {CssBaseline, StyledEngineProvider, ThemeProvider} from "@mui/material";
import {theme} from "./GlobalStyles";

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


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
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
