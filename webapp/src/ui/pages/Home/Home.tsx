import React from 'react';
import {Box, Button} from "@mui/material";
import {useAccount, useConnectModal, useProvider} from "@web3modal/react";
import {useCreateCgProject} from "../../../hooks/useCreateCgProject";
import {CONTRACTS_DETAILS} from "../../../utils/constants";

/**
 *
 * @param {React.PropsWithChildren<IHome>} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: React.FC<IHome> = (props) => {
  const { isOpen, open, close } = useConnectModal();
  const { account } = useAccount();
  const { provider } = useProvider();

  const {tokenAddress, transactionHash, error, checkNow} = useCreateCgProject({
    tokenName: "First Test",
    tokenSymbol: "TEST",
    prevContrRewards: 50,
    web3: provider,
    cgFactoryAddress: CONTRACTS_DETAILS[1337].CG_FACTORY,
    cgFactoryAbi: CONTRACTS_DETAILS[1337].CG_FACTORY_ABI,
    fromAddress: account.address
  });

  const test = () => {

  }

  console.log(account);

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height="100vh">
      <Button onClick={open} variant="contained">
        ciao
      </Button>
      <Button onClick={() => {checkNow({
        tokenName: "First Test",
        tokenSymbol: "TEST",
        prevContrRewards: 50,
        web3: provider,
        cgFactoryAddress: CONTRACTS_DETAILS[1337].CG_FACTORY,
        cgFactoryAbi: CONTRACTS_DETAILS[1337].CG_FACTORY_ABI,
        fromAddress: account.address
      })}} variant="contained">
        ciao
      </Button>
    </Box>
  );
};

export interface IHome {

}

export default Home;
