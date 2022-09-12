require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/903ad3bdef654d9ba0a0d28b2b5d6edf",
      accounts: [`0x437cf0472fbe1f6e654b432b43fbcd0e21979f2c721cf2666648ce66fe2fb4e8`]
    }
  }
};
