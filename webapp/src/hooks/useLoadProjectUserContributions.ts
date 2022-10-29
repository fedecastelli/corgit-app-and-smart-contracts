import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {Contract, Signer} from "ethers";
import {useContract} from "@web3modal/react";
import {CONTRACTS_DETAILS} from "../utils/constants";
import contributions, {contributionsReducerActions} from "../store/reducers/contributions";

export interface LoadProjectUserContributionsInterface {
  signer: Signer,
  address: string
}

export interface ProjectUserContributionInterface {
  paymentId: number,
  amount: number,
  paid: boolean,
  creation: number,
  totalTokenAmount: number,
  totalTokenClaimed: number,
  name: string,
  numOfUsers: number,
  claimCompleted: boolean
}

const loadProjectUserContributions = async (params: {
  signer: Signer, address: string, githubContract: Contract, cgTokenContract: Contract}):
    Promise<{githubId: number | undefined, contributions: ProjectUserContributionInterface[]}> => {
  // get github id connect to the address parameter
  const githubId = await params.githubContract.connect(params.signer).addressToGithubID[params.address];
  if (githubId === undefined) return {githubId: undefined, contributions: []};
  // get the list id payment ids associated with the github id got from the blockchain
  const paymentIds = await params.cgTokenContract.connect(params.signer).userPayments[githubId];
  const userPaymentsPromises = [];
  const paymentsPromises = [];
  paymentIds.forEach((paymentId: string) => {
    userPaymentsPromises.push(params.cgTokenContract.connect(params.signer).paymentAmounts[paymentId]);
    paymentsPromises.push(params.cgTokenContract.connect(params.signer).payments[paymentId]);
  });
  const userPayments: {amount: number, paid: boolean}[] = [] ;
  if (userPaymentsPromises.length !== 0) {
    let responses = await Promise.all(userPaymentsPromises);
    responses.forEach(response => {
      userPayments.push({
        amount: response.amount,
        paid: response.paid
      });
    });
  }
  const payments: {
    creation: number, totalTokenAmount: number, totalTokenClaimed: number, name: string,
    numOfUsers: number, claimCompleted: boolean}[] = [];
  if (paymentsPromises.length !== 0) {
    let responses = await Promise.all(paymentsPromises);
    responses.forEach(response => {
      payments.push({
        creation: response.creation,
        totalTokenAmount: response.totalTokenAmount,
        totalTokenClaimed: response.totalTokenClaimed,
        name: response.name,
        numOfUsers: response.numOfUsers,
        claimCompleted: response.claimCompleted
      });
    })
  }
  const contributions: ProjectUserContributionInterface[] = [] as ProjectUserContributionInterface[];
  for (let position in paymentIds) {
    contributions.push({
      paymentId: paymentIds[position],
      creation: payments[position].creation,
      totalTokenAmount: payments[position].totalTokenAmount,
      totalTokenClaimed: payments[position].totalTokenClaimed,
      name: payments[position].name,
      numOfUsers: payments[position].numOfUsers,
      claimCompleted: payments[position].claimCompleted,
      amount: userPayments[position].amount,
      paid: userPayments[position].paid
    });
  }
  return {githubId: githubId, contributions: contributions};
}

export const useLoadProjectUserContributions = (cgTokenAddress: string) => {
  const [status, setStatus] = useState<{
    loading: boolean,
    error: string,
    projectUserContributions: ProjectUserContributionInterface[]
  }>({loading: false, error: "", projectUserContributions: [] as ProjectUserContributionInterface[]});
  const dispatch = useAppDispatch();
  const { contract, isReady } = useContract({
    address: CONTRACTS_DETAILS[5].GITHUB_ADDRESS_REGISTER,
    abi: CONTRACTS_DETAILS[5].GITHUB_ADDRESS_REGISTER_ABI
  });
  const cgTokenContractInfo = useContract({
    address: cgTokenAddress,
    abi: CONTRACTS_DETAILS[5].CG_PROJECT_ABI
  });
  const cgTokenContract = cgTokenContractInfo.contract;
  const checkNow = (params: LoadProjectUserContributionsInterface) => {
    setStatus({loading: true, error: "", projectUserContributions: []});
    loadProjectUserContributions({
      signer: params.signer,
      address: params.address,
      cgTokenContract: cgTokenContract,
      githubContract: contract})
        .then(userContributions => {
          if (userContributions.githubId === undefined) {
            setStatus({loading: false, error: "No githubId connected to the given address", projectUserContributions: []});
          } else {
            dispatch(contributionsReducerActions.setUserContributions(userContributions.contributions));
            setStatus({loading: false, error: "", projectUserContributions: userContributions.contributions});
          }
        })
  }
  return {
    ...status, checkNow
  }
}
