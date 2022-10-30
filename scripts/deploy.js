// const { token } = require("@project-serum/anchor/dist/cjs/utils");
const { ethers } = require("hardhat");

async function main() {
  const [...players]= await ethers.getSigners();
  const nftContract = await ethers.getContractFactory("MyEpicGame");
  const deployContract = await nftContract.deploy(
    ["ankit", "kumar", "bhagat"],
    ["https://i.imgur.com/pKd5Sdk.png",
      "https://i.imgur.com/xVu4vFL.png",
      "https://i.imgur.com/WMB6g9u.png"],

    [100, 200, 300],
    [100, 50, 25],
    "elon miusk",
    "https://i.imgur.com/AksR0tt.png",
    10000,
    50
  );
  await deployContract.deployed();
  console.log("Contract Address:", deployContract.address);

  // let txn = await deployContract.connect(players[1]).mintCharacterNFT(2);
  // await txn.wait();
  // console.log("Minted NFT #1");
  // console.log("player %s has tokenid",players[0].address, await deployContract.nftholder(players[0].address));
  
  // console.log("user have :", await deployContract.connect(players[0]).checkIfUserHasNFT() )
 
  // txn = await deployContract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #2");

  // txn = await deployContract.mintCharacterNFT(2);
  // await txn.wait();
  // console.log("Minted NFT #3");

  // txn = await deployContract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #4");

 // console.log("Token ID %s have %s", 1, await deployContract.nftholderAttribute(1));

  // let txn_tokenUri = await deployContract.tokenURI(1);
  // console.log("Token Uri of index of %s is",1,txn_tokenUri);


  
  // txn = await deployContract.attackboss();
  // await txn.wait();

  // txn = await deployContract.attackboss();
  // await txn.wait();


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
//0x55F7840A48441351891E1bf9E12286A1c924A451