import Web3 from "web3";
import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {AbiItem} from "web3-utils";

export interface CreateCgProjectInterface {
  web3: Web3,
  fromAddress: string,
  cgFactoryAbi: AbiItem,
  cgFactoryAddress: string,
  tokenName: string,
  tokenSymbol: string,
  prevContrRewards: number
}

export const useCreateCgProject = (params: CreateCgProjectInterface) => {
  const [status, setStatus] = useState<{
    loading: boolean,
    error: string,
    tokenAddress: string
  }>({loading: false, error: "", tokenAddress: ""});
  const dispatch = useAppDispatch();
  const checkNow = (params: CreateCgProjectInterface) => {
    setStatus({loading: true, error: "", tokenAddress: ""});
    // TODO: understand if this part of code is working
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
              console.log(hash);
            })
            .on('receipt', function(receipt: string){
              console.log(receipt);
            })
            .on('error', (e: any) => {
              console.error(e);
            });
      }
    });
  }
  return {
    ...status, checkNow
  }
}
