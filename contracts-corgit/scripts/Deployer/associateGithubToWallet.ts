import {ethers} from "hardhat";
import {GithubAddressRegister} from "../../typechain-types";

export const associateGithubToWallet = async (
  chainId: number,
  enableWaiting: boolean = false,
  githubAddressRegisterContract: string,
  githubId: number,
  walletAddress: string
): Promise<{

}> => {

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();

  // get the next nouce
  let next_nonce = await owner.getTransactionCount();

  const contractFactory = await ethers.getContractFactory("GithubAddressRegister");
  const githubContract = await contractFactory.attach(githubAddressRegisterContract);

  const transaction = await githubContract.connect(owner).addAddress(githubId, walletAddress);
  console.log(transaction);

  return {};
}

if (typeof require !== 'undefined' && require.main === module) {
  let chainId: "5" | "137" | "1337" = "137";
  associateGithubToWallet(
    parseInt("5"),
    false,
      "0xd5F210aAe5330308ebc2B015Bfb0e70839251811",
      31770652,
      "0x349F4A96a44fcd83338b90DC37Fb7F5FeEc8AdE1"
  )
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}



