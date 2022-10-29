import React from 'react';
import {Box, Button} from "@mui/material";
import {useAccount, useConnectModal, useProvider} from "@web3modal/react";

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

  const test = () => {

  }

  console.log(account);

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height="100vh">
      <Button onClick={open} variant="contained">
        ciao
      </Button>
    </Box>
  );
};

export interface IHome {

}

export default Home;
