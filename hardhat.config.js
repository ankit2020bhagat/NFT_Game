require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url:  process.env.GOERLI_API_KEY_URL,
      accounts: [process.env.PRIVATE_KEY],
     
    },
  },
};
