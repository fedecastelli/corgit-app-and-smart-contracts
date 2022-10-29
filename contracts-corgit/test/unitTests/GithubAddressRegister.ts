import {deployGithubAddressRegister} from "../../scripts/Deployer/SingleContracts/GithubAddressRegister";
import {GithubAddressRegister} from "../../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {expect} from "chai";


describe("GithubAddressRegister", () => {

  let githubAddressRegister: GithubAddressRegister;
  let deployer: SignerWithAddress;
  let user01: SignerWithAddress;
  let user02: SignerWithAddress;
  let user03: SignerWithAddress;

  // deploy the NFT contract itself
  before(async () => {
    const [us0, us1, us2, us3] = await ethers.getSigners();
    deployer = us0;
    user01 = us1;
    user02 = us2;
    user03 = us3;
    githubAddressRegister = await deployGithubAddressRegister(deployer);
  });

  it("Should add a new address", async () => {
    let githubId = 123456;
    let walletToAdd = "0x1234561234561234561212345612345612345612";
    await githubAddressRegister.addAddress(
      githubId,
      walletToAdd
    );
    expect(await githubAddressRegister.githubIDToAddress(githubId, 0)).to.be.equal(walletToAdd);
    expect(await githubAddressRegister.addressToGithubID(walletToAdd)).to.be.equal(githubId);
  });



})
