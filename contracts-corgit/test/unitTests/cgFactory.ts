import {CgFactory, CgToken} from "../../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {deployGithubAddressRegister} from "../../scripts/Deployer/SingleContracts/GithubAddressRegister";
import {deployCgFactory} from "../../scripts/Deployer/SingleContracts/cgFactory";
import {expect} from "chai";
import {NewCgTokenCreatedEvent} from "../../typechain-types/contracts/CgFactory";
import {BigNumber} from "ethers";
import exp from "constants";

describe("cgFactory", () => {

  let cgFactory: CgFactory;
  let deployer: SignerWithAddress;
  let user01: SignerWithAddress;
  let user02: SignerWithAddress;
  let user03: SignerWithAddress;
  let githubId = 123456;  // connected with user02

  // deploy the NFT contract itself
  before(async () => {
    const [us0, us1, us2, us3] = await ethers.getSigners();
    deployer = us0;
    user01 = us1;
    user02 = us2;
    user03 = us3;
    const githubAddressRegister = await deployGithubAddressRegister(deployer);
    cgFactory = await deployCgFactory(deployer, githubAddressRegister.address);
    await githubAddressRegister.addAddress(githubId, user02.address);
  });

  it("Should generate a new contract", async () => {
    const tx = await cgFactory.connect(user01).generate("TestP", "TPP", 50);
    const rc = await tx.wait(); // 0ms, as tx is already confirmed
    const event = rc?.events?.find(event => event.event === 'NewCgTokenCreated');
    expect(event).to.not.be.undefined;
    // @ts-ignore
    const [_addr, _name, _symbol, _percFundingDistribute] = event?.args as NewCgTokenCreatedEvent;
    expect(_addr).to.not.be.equal("0x0000000000000000000000000000000000000000");
  });

  describe("cgToken Operations", () => {

    let cgToken: CgToken;
    let symbol: string = "TPP";
    let name: string = "TestP";

    before(async () => {
      const tx = await cgFactory.connect(user01).generate("TestP", "TPP", 50);
      const rc = await tx.wait(); // 0ms, as tx is already confirmed
      const event = rc?.events?.find(event => event.event === 'NewCgTokenCreated');
      expect(event).to.not.be.undefined;
      // @ts-ignore
      const [_addr, _name, _symbol, _percFundingDistribute] = event?.args as NewCgTokenCreatedEvent;
      const contractFactory = await ethers.getContractFactory("cgToken", deployer);
      cgToken = await contractFactory.connect(user01).attach(_addr) as CgToken;
    });

    it("Should have correct contract details", async () => {
      expect(await cgToken.symbol()).to.be.equal(`cg${symbol}`);
      expect(await cgToken.name()).to.be.equal(name);
      expect(await cgToken.decimals()).to.be.equal(18);
      expect(await cgToken.totalSupply()).to.be.equal(BigNumber.from(10).pow(18).mul(100000));
    });

    it("Should pay to user02", async () => {
      let amountToPay: BigNumber = BigNumber.from(10).pow(18).mul(100);
      let deploymentName: string = "First deployment";
      await cgToken.pay([githubId], [amountToPay], deploymentName);
      let payment = await cgToken.payments(0);
      expect(payment.creation).to.be.gt(0);
      expect(payment.totalTokenAmount).to.be.equal(amountToPay);
      expect(payment.totalTokenClaimed).to.be.equal(0);
      expect(payment.name).to.be.equal(deploymentName);
      expect(payment.numOfUsers).to.be.equal(1);
      expect(payment.claimCompleted).to.be.false;
      let paymentAmounts = await cgToken.paymentAmounts(0, githubId);
      expect(paymentAmounts.amount).to.be.equal(amountToPay);
      expect(paymentAmounts.paid).to.be.false;
      let userPaymentId = await cgToken.userPayments(githubId, 0);
      expect(userPaymentId).to.be.equals(0);
      let lockedTokensForPayments = await cgToken.lockedTokensForPayments();
      expect(lockedTokensForPayments).to.be.equals(amountToPay);
    })

    it("Should collect payment user02", async () => {
      let amountPaid: BigNumber = BigNumber.from(10).pow(18).mul(100);
      await cgToken.connect(user02).collectPayment(user02.address, 0);
      expect(await cgToken.balanceOf(user02.address)).to.be.equal(amountPaid);
      let payment = await cgToken.payments(0);
      expect(payment.totalTokenClaimed).to.be.equal(amountPaid);
      expect(payment.claimCompleted).to.be.true;
      let paymentAmounts = await cgToken.paymentAmounts(0, githubId);
      expect(paymentAmounts.paid).to.be.true;
    });

    it("Should contribute", async () => {
      let contribution = ethers.utils.parseEther("2");
      await cgToken.connect(user03).contribute({
        value: contribution
      });
      let contractBalance = await ethers.provider.getBalance(cgToken.address);
      console.log(contractBalance);
      expect(contractBalance).to.be.equal(contribution);
    });

  });



})
