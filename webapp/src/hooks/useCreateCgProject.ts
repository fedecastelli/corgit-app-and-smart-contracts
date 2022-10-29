import Web3 from "web3";
import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {AbiItem} from "web3-utils";
import {Provider} from "@web3modal/ethereum";
import {ContractInterface, ethers} from "ethers";
import {useContract, useSendTransaction} from "@web3modal/react";

export interface CreateCgProjectInterface {
  web3: ethers.providers.Provider,
  fromAddress: string,
  cgFactoryAbi: AbiItem,
  cgFactoryAddress: string,
  tokenName: string,
  tokenSymbol: string,
  prevContrRewards: number
}

export const useCreateCgProject = (params: CreateCgProjectInterface) => {
  const [status, setStatus] = useState<{
    transactionHash: string,
    error: string,
    tokenAddress: string
  }>({transactionHash: "", error: "", tokenAddress: ""});
  const dispatch = useAppDispatch();
  const { contract, isReady } = useContract({
    address: params.cgFactoryAddress,
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_githubID","type":"uint256"},{"internalType":"address","name":"_wallet","type":"address"}],"name":"addAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressToGithubID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"githubIDToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_githubID","type":"uint256"},{"internalType":"address","name":"_addressToRemove","type":"address"}],"name":"removeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  });
  const checkNow = (params: CreateCgProjectInterface) => {
    setStatus({transactionHash: "", error: "", tokenAddress: ""});
    // TODO: understand if this part of code is working

    contract.methods.generate(params.tokenName, params.tokenSymbol, params.prevContrRewards).then(result => {
      console.log(result);
      return result.wait()
          .then(rc => {
            const event = rc?.events?.find(event => event.event === 'NewCgTokenCreated');
            console.log(event);
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
