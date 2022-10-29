import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {useAccount, useConnectModal, useProvider} from "@web3modal/react";
<<<<<<< HEAD
import {theme} from "../../../GlobalStyles";
import {RocketLaunch} from "@mui/icons-material";
import {useSearchCgProject} from "../../../hooks/useSearchCgProject";
import {useDebounce} from "use-debounce";
=======
import {useCreateCgProject} from "../../../hooks/useCreateCgProject";
import {CONTRACTS_DETAILS} from "../../../utils/constants";
>>>>>>> feature/create-hooks

/**
 *
 * @param {React.PropsWithChildren<IHome>} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: React.FC<IHome> = (props) => {
  const { loading, address, error, checkNow } = useSearchCgProject();

<<<<<<< HEAD
  const [tokenSearchValue, setTokenSearchValue] = useState<string>("");
  const [searchCgProjectValue] = useDebounce(tokenSearchValue, 500);
=======
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
>>>>>>> feature/create-hooks

  useEffect(() => {
    if (searchCgProjectValue)
      checkNow(searchCgProjectValue);
  }, [searchCgProjectValue]);

  useEffect(() => {
    if (address)
      alert(address);
  }, [address])

  const onInputChange = (e) => {
    setTokenSearchValue(e.target.value);
  }

  return (
    <Box display={"flex"} alignItems={"center"}  height="100vh" flexDirection={"column"} sx={{pt: 24}}>
      <h1 style={{fontSize: 80, margin: 0, color: theme.palette.primary.main}}>
        CorGit
      </h1>
      <div style={{fontSize: 40}}>
        Open Source project tokenization
      </div>
      <Box width={500} sx={{mt: 4}}>
        <TextField fullWidth
                   size={"small"}
                   value={tokenSearchValue}
                   onChange={onInputChange}
                   InputProps={{
                     ...( loading ? {endAdornment: <CircularProgress size={16}/>}: {} )
                   }}
                   placeholder={"Search by Github Repo URL or Token Address"} />
      </Box>

      <Button variant={"contained"}
              color="secondary"
              startIcon={<RocketLaunch />}
              sx={{color: "white", textTransform: "none", mt: 4}}>
        Create a New cgToken
      </Button>
<<<<<<< HEAD

      <Box position={"absolute"} zIndex={-1} bottom={0} left={0}>
        <img src={"/img/CorGitHomeImage.png"}/>
      </Box>

=======
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
>>>>>>> feature/create-hooks
    </Box>
  );
};

export interface IHome {

}

export default Home;
