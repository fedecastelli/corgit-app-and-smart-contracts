import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {useAccount, useConnectModal, useProvider} from "@web3modal/react";
import {theme} from "../../../GlobalStyles";
import {RocketLaunch} from "@mui/icons-material";
import {useSearchCgProject} from "../../../hooks/useSearchCgProject";
import {useDebounce} from "use-debounce";

/**
 *
 * @param {React.PropsWithChildren<IHome>} props
 * @return {JSX.Element}
 * @constructor
 */
const Home: React.FC<IHome> = (props) => {
  const { loading, address, error, checkNow } = useSearchCgProject();
  const [tokenSearchValue, setTokenSearchValue] = useState<string>("");
  const [searchCgProjectValue] = useDebounce(tokenSearchValue, 500);

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

      <Box position={"absolute"} zIndex={-1} bottom={0} left={0}>
        <img src={"/img/CorGitHomeImage.png"}/>
      </Box>
    </Box>
  );
};

export interface IHome {

}

export default Home;
