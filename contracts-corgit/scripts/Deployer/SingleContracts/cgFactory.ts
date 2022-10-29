import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {CgFactory} from "../../../typechain-types";
import {ethers} from "hardhat";

/**
 * Deploy an instance of cgFactory
 * @param signer - who's going to sign the transaction
 * @param {string} githubAddressRegisterAddress - address of Github Address Register
 * @param [nonce] - if we want to pass a nonce, rather than having the code to evaluate it
 */
export async function deployCgFactory(
  signer: SignerWithAddress,
  githubAddressRegisterAddress: string,
  nonce: number = -1
): Promise<CgFactory> {
  let next_nonce = nonce >= 0 ? nonce : await signer.getTransactionCount();
  const contractFactory = await ethers.getContractFactory("cgFactory", signer);
  return await contractFactory.deploy(
    githubAddressRegisterAddress,
    { nonce: next_nonce }
  ) as CgFactory;

}
