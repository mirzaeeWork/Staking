const hre = require("hardhat");

async function main() {
  const ExampleExternal = await hre.ethers.getContractFactory("ExampleExternalContract");
  const exampleExternal = await ExampleExternal.deploy();

  await exampleExternal.deployed();

  console.log("ExampleExternalContract deployed to:", exampleExternal.address);

  const ExampleStaker = await hre.ethers.getContractFactory("Staker");
  const exampleStaker = await ExampleStaker.deploy(exampleExternal.address,172800);

  await exampleStaker.deployed();
  console.log("Staker deployed to:", exampleStaker.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
