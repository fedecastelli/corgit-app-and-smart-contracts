import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {useContract} from "wagmi";
import {CONTRACTS_DETAILS} from "../utils/constants";
import {Signer} from "ethers";

export const useClaimRewards = (params: {cgTokenAddress: string}) => {
  const [status, setStatus] = useState<{
    completed: boolean,
    transactionHash: string,
    error: string
  }>({completed: false, transactionHash: "", error: ""});
  const dispatch = useAppDispatch();
  const contract = useContract({
    address: params.cgTokenAddress,
    abi: CONTRACTS_DETAILS[5].CG_PROJECT_ABI
  });
  const checkNow = (params: {toAddress: string, paymentId: number, signer: Signer}) => {
    setStatus({completed: false, transactionHash: "", error: ""});
    contract.connect(params.signer).collectPayment(params.toAddress, params.paymentId)
        .on('transactionHash', (hash: string) => {
          setStatus({completed: false, transactionHash: hash, error: ""});
        })
        .on('receipt', (receipt) => {
          setStatus({completed: true, transactionHash: "", error: ""});
        })
        .on('error', (e: any) => {
          console.error(e);
          setStatus({completed: true, error: "Transaction error", transactionHash: ""});
        })
  }
  return {
    ...status, checkNow
  };
}
