import Web3 from "web3";
import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {AbiItem} from "web3-utils";
import {Provider} from "@web3modal/ethereum";
import {ContractInterface, ethers, Signer} from "ethers";
import {useContract, useProvider, useSendTransaction, useSigner} from "@web3modal/react";
import {CONTRACTS_DETAILS} from "../utils/constants";

export interface CreateCgProjectInterface {
  fromAddress: string,
  tokenName: string,
  tokenSymbol: string,
  prevContrRewards: number,
  signer: Signer
}

export const useCreateCgProject = () => {
  const [status, setStatus] = useState<{
    transactionHash: string,
    error: string,
    tokenAddress: string
  }>({transactionHash: "", error: "", tokenAddress: ""});
  const dispatch = useAppDispatch();

  const { contract, isReady } = useContract({
    address: CONTRACTS_DETAILS[5].CG_FACTORY,
    abi: CONTRACTS_DETAILS[5].CG_FACTORY_ABI
  });

  const checkNow = (params: CreateCgProjectInterface) => {
    setStatus({transactionHash: "", error: "", tokenAddress: ""});
    // call the contract function to generate a new cg token
    contract.connect(params.signer).generate(
        params.tokenName,
        params.tokenSymbol,
        params.prevContrRewards
      ).then(result => {
      console.log("result", result);
      return result.wait()
          .then(rc => {
            console.log('RC');
            console.log(rc);
            const event = rc?.events?.find(event => event.event === 'NewCgTokenCreated');
            console.log("event read", event);
            const [_addr, _name, _symbol, _percFundingDistribute] = event?.args;
            setStatus({transactionHash: "", error: "", tokenAddress: _addr});
          })
    });
  }
  return {
    ...status, checkNow
  }
}
