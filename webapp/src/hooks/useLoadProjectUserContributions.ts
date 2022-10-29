import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {CreateCgProjectInterface} from "./useCreateCgProject";

interface AddressToGithubIdInterface {
  web3: Web3,
  githubAddressRegisterAbi: AbiItem,
  githubAddressRegisterAddress: string,
  address: string
}

export interface LoadProjectUserContributionsInterface {
  web3: Web3,
  githubAddressRegisterAbi: AbiItem,
  githubAddressRegisterAddress: string,
  address: string
}

export interface ProjectUserContributionInterface {

}

const addressToGithubId = async (params: AddressToGithubIdInterface): Promise<number | undefined> => {
  let cgTokenContract = new params.web3.eth.Contract(
      params.githubAddressRegisterAbi, params.githubAddressRegisterAddress);
  return await cgTokenContract.methods.addressToGithubID[params.address];
}

export const useLoadProjectUserContributions = (params: LoadProjectUserContributionsInterface) => {
  const [status, setStatus] = useState<{
    loading: boolean,
    error: string,
    projectUserContributions: ProjectUserContributionInterface[]
  }>({loading: false, error: "", projectUserContributions: [] as ProjectUserContributionInterface[]});
  const dispatch = useAppDispatch();
  const checkNow = (params: CreateCgProjectInterface) => {
    
  }
  return {
    ...status, checkNow
  }
}
