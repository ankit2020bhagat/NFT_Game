// const { token } = require("@project-serum/anchor/dist/cjs/utils");
const { ethers } = require("hardhat");

async function main() {
  const nftContract = await ethers.getContractFactory("MyEpicNFT");
  const deployContract = await nftContract.deploy(
    ["ankit", "kumar", "bhagat"],
    ["https://i.imgur.com/pKd5Sdk.png",
      "https://i.imgur.com/xVu4vFL.png",
      "https://i.imgur.com/WMB6g9u.png"],

    [100, 200, 300],
    [100, 50, 25]
  );
  await deployContract.deployed();
  console.log("Contract Address:", deployContract.address);

  let txn = await deployContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await deployContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await deployContract.mintCharacterNFT(2);
  await txn.wait();
  console.log("Minted NFT #3");

  txn = await deployContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #4");

 // console.log("Token ID %s have %s", 1, await deployContract.nftholderAttribute(1));

  // let txn_tokenUri = await deployContract.tokenURI(1);
  // console.log("Token Uri of index of %s is",1,txn_tokenUri);

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}
runMain();