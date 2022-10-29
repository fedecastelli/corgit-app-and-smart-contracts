import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import {Signer} from "ethers";
import {useContract} from "@web3modal/react";
import {CONTRACTS_DETAILS} from "../utils/constants";

export interface LoadProjectUserContributionsInterface {
  signer: Signer,
  address: string,
  tokenAddress: string
}

export interface ProjectUserContributionInterface {

}

export const useLoadProjectUserContributions = (cgTokenAddress: string) => {
  const [status, setStatus] = useState<{
    loading: boolean,
    error: string,
    projectUserContributions: ProjectUserContributionInterface[]
  }>({loading: false, error: "", projectUserContributions: [] as ProjectUserContributionInterface[]});
  const dispatch = useAppDispatch();
  const { contract, isReady } = useContract({
    address: CONTRACTS_DETAILS[1337].GITHUB_ADDRESS_REGISTER,
    abi: CONTRACTS_DETAILS[1337].GITHUB_ADDRESS_REGISTER_ABI
  });
  const cgTokenContractInfo = useContract({
    address: cgTokenAddress,
    abi: CONTRACTS_DETAILS[1337].CG_PROJECT_ABI
  });
  const cgTokenContract = cgTokenContractInfo.contract;
  const checkNow = (params: LoadProjectUserContributionsInterface) => {

    contract.connect(params.signer).addressToGithubID[params.address]
        .then(githubId => {
          console.log(githubId);
          return githubId;
        })
  }
  return {
    ...status, checkNow
  }
}
