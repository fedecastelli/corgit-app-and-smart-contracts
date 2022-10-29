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
    // TODO: understand if this part of code is working

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
            // const [_addr, _name, _symbol, _percFundingDistribute] = event?.args as NewCgTokenCreatedEvent;
          })
    });

    /*
    let cgTokenContract = new params.web3.eth.Contract(params.cgFactoryAbi, params.cgFactoryAddress);
    cgTokenContract.methods.generate(params.tokenName, params.tokenSymbol, params.prevContrRewards).estimateGas({
      value: 0,  // TODO: understand what I have to put here as value
      from: params.fromAddress
    }).then((err, estimatedGas) => {
      if (err) console.log(err);
      else {
        cgTokenContract.methods.generate(params.tokenName, params.tokenSymbol, params.prevContrRewards).send({
          from: params.fromAddress,
          to: params.cgFactoryAddress,
          value: 0,
          gas: Math.floor(parseInt(estimatedGas) * 1.1)
        })
            .on('transactionHash', (hash: string) => {
              setStatus({transactionHash: hash, error: "", tokenAddress: ""});
            })
            .on('receipt', (receipt) => {
              console.log(receipt);
            })
            .on('error', (e: any) => {
              console.error(e);
            });
      }
    });
     */
  }
  return {
    ...status, checkNow
  }
}
