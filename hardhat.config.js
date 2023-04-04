require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: "https://g.w.lavanet.xyz:443/gateway/gth1/rpc-http/9f077c1bd895c1cead9fcdb0b96dd33f",
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
