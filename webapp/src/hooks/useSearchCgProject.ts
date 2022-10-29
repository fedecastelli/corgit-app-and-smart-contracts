import {useState} from "react";
import {useAppDispatch} from "./reduxHooks";
import isGithubUrl from "is-github-url";
import parseGithubUrl from "parse-github-url";
import axios, {AxiosResponse} from "axios";
import {cgProjectReducerActions} from "../store/reducers/cgProject";

const getContractAddressFromGithubRepo = async (repoOwner: string, repoName: string): Promise<string | undefined> => {
  const githubRawResponse: AxiosResponse = await axios.get(
      `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/.corgit.config`);
  if (githubRawResponse.status === 200) {
    const corgitConfig: {cgTokenAddress: string} = githubRawResponse.data;
    return corgitConfig.cgTokenAddress;
  } else return undefined;
}

export const useSearchCgProject = (address: string) => {
  const [status, setStatus] = useState<{
    loading: boolean,
    error: string,
    address: string,
  }>({loading: false, error: "", address: ""});
  const dispatch = useAppDispatch();
  const checkNow = (address: string) => {
    console.log(address);
    setStatus({loading: true, error: "", address: ""});
    // understand if the address parameter is an ETH contract address or a GitHub repository
    if (isGithubUrl(address, {repository: true, strict: false})) {
      console.log(`Valid GitHub url -> ` + address);
      const githubRepoInfo = parseGithubUrl(address);
      // get token address from the master branch
      getContractAddressFromGithubRepo(githubRepoInfo.owner, githubRepoInfo.name)
          .then(tokenAddress => {
            if (tokenAddress === undefined) {
              setStatus({loading: false, error: ".corgit.config not found", address: ""});
            } else {
              setStatus({loading: false, error: "", address: tokenAddress});
              dispatch(cgProjectReducerActions.setCgProjectInformation({
                tokenAddress: tokenAddress, githubUrl: address}));
            }
          });
    } else {
      // TODO: wait for Antonio's smart contracts to see what method I have to call to get the information I need
      console.log('Invalid GitHub url, let\'s see if it\'s a valid address');
    }
  }
  return {
    ...status, checkNow
  }
}
