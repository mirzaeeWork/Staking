const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Staker&ExampleExternalContract", function () {
  async function deployTwoContract() {
    const ContractExampleExternal = await hre.ethers.getContractFactory("ExampleExternalContract");
    const exampleExternal = await ContractExampleExternal.deploy();
  
    await exampleExternal.deployed();
  
    console.log("ExampleExternalContract deployed to:", exampleExternal.address);
  
    const ContractExampleStaker = await hre.ethers.getContractFactory("Staker");
    const exampleStaker = await ContractExampleStaker.deploy(exampleExternal.address,30);
  
    await exampleStaker.deployed();
    console.log("Staker deployed to:", exampleStaker.address);
  
    const [addr1, addr2] = await ethers.getSigners();
    console.log('------------------------------------------')
    return { exampleExternal,exampleStaker, addr1, addr2 };
  }

  it("should be able to transfer ether from acount address to smart contract", async function () {
    console.log('------------------------------------------')

    const {exampleStaker, addr1, addr2 } = await loadFixture(deployTwoContract);
    const oneEther = ethers.utils.parseEther( "0.5" );
    console.log("oneEther : "+ oneEther);
    await exampleStaker.connect(addr1).stake({value:oneEther });
    console.log("get balance : "+ `${await exampleStaker.connect(addr1).getBalance()}`);

    expect(await exampleStaker.connect(addr1).getBalance()).to.equal(oneEther);

  });

  it("should be able to execute ether from smart contract to smart contract anouther another", async function () {
    console.log('------------------------------------------')
    const {exampleStaker, addr1, addr2} = await loadFixture(deployTwoContract);
    const oneEther = ethers.utils.parseEther( "3.1" );
    console.log("oneEther : "+ oneEther);
    await exampleStaker.connect(addr1).stake({value:oneEther });
    await network.provider.send("evm_increaseTime", [30]);
    await exampleStaker.connect(addr1).execute();
    const countBalance=await exampleStaker.getBalanceExampleExternalContract();
    console.log("Wei : ", countBalance);
    expect(countBalance).to.equal(oneEther);

  });

  it("should be able to withdraw ether from smart contract to acount address", async function () {
    console.log('------------------------------------------')
    const {exampleStaker, addr1, addr2} = await loadFixture(deployTwoContract);
    const oneEther = ethers.utils.parseEther( "2.5" );
    console.log("oneEther : "+ oneEther);
    await exampleStaker.connect(addr1).stake({value:oneEther });
    await network.provider.send("evm_increaseTime", [30]);
    await exampleStaker.connect(addr1).withdraw();
    console.log("get balance : "+ `${await exampleStaker.connect(addr1).getBalance()}`);
    expect(await exampleStaker.connect(addr1).getBalance()).to.equal(0);
  });
});
















// describe("NftERC721", function () {
//   it("Should be able to mint an NFT", async function () {
//     const ContractNftERC721 = await ethers.getContractFactory("NftERC721");
//     const [addr1, addr2] = await ethers.getSigners();

//     const hardhatNftERC721 = await ContractNftERC721.deploy("Darya", "DRY");
//     await hardhatNftERC721.deployed();
//     console.log(hardhatNftERC721.address)

//     const startingBalance = await hardhatNftERC721.balanceOf(addr1.address);

//     await hardhatNftERC721.connect(addr1).mint("https://gateway.pinata.cloud/ipfs/QmZ4fJuVxq2uLab53HH3WD6irhP8h6yC5Qjf6mgrf9oS38")
//     const newBalance = await hardhatNftERC721.balanceOf(addr1.address);
//     expect(newBalance).to.equal(startingBalance.add(1));
//   });

// });















