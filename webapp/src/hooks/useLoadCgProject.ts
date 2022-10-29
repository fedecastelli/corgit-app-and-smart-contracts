import Web3 from "web3";
import {AbiItem} from "web3-utils";

const getCgTokenInformation = async (params: {web3: Web3, cgTokenAbi: AbiItem, cgTokenAddress: string}): Promise<{
  tokenSymbol: string,
  distributionReward: number
}> => {

  let contract = new params.web3.eth.Contract(params.cgTokenAbi, params.cgTokenAddress);
  let promises = [];
  promises.push(contract.methods.symbol().call);
  promises.push(contract.methods.percFundingDistributed().call);

  let responses = await Promise.all(promises);
  const tokenSymbol = responses[0];
  const distributionReward = responses[1];

  return {tokenSymbol: tokenSymbol, distributionReward: distributionReward};
};

export const useLoadCgProject = () => {

};
