import {ethers} from "hardhat";
import {CgFactory, GithubAddressRegister} from "../../typechain-types";
import {deployGithubAddressRegister} from "./SingleContracts/GithubAddressRegister";
import {deployCgFactory} from "./SingleContracts/cgFactory";

/**
 * Function to deploy all the contracts on a new chain. We've used a dedicate function, so that we can call it
 * also during testing
 *
 * @param {number} chainId - number of the chain where we'll deploy
 * @param {boolean} [enableWaiting] - if true, the waiting between certain deployment calls are executed. This can be skipped to speed up tests on local hardhat node
 */
export const deploy = async (
  chainId: number,
  enableWaiting: boolean = false
): Promise<{
  cgFactory: CgFactory,
  githubAddressRegister: GithubAddressRegister
}> => {

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();

  // get the next nouce
  let next_nonce = await owner.getTransactionCount();

  // Deploy all the smart contracts
  const githubAddressRegister = await deployGithubAddressRegister(owner, next_nonce);
  console.log("githubAddressRegister deployed - " + githubAddressRegister.address);

  const cgFactory = await deployCgFactory(owner, githubAddressRegister.address, ++next_nonce);
  console.log("cgFactory deployed - " + cgFactory.address);

  if (enableWaiting)
    await new Promise((resolve, reject) => {setTimeout(resolve,15000)});

  return { githubAddressRegister: githubAddressRegister, cgFactory }
}


if (typeof require !== 'undefined' && require.main === module) {
  let chainId: "5" | "137" | "1337" = "137";
  deploy(
    parseInt(chainId),
    false
  )
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}



