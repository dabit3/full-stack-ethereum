![The Complete Guide to Full Stack Ethereum Development
](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fxq0yu3jd7qw35itdxii.jpg)

This codebase goes along with the tutorial [The Complete Guide to Full Stack Ethereum Development](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

The video course for this codebase is located [here](https://www.youtube.com/watch?v=a0osIaAOFSE)

### Open in Gitpod

To deploy this project to Gitpod, click this button:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/dabit3/full-stack-ethereum)

Once the setup is complete, import the rpc endpoing running on Gitpod into your wallet as a custom RPC.

For instance, your RPC enpoint will probably look something like this:

```sh
https://8545-sapphire-pigeon-uiroo9v8.ws-eu18.gitpod.io/
```

The ChainID should be 1337, and you may need to delete a localhost configuration if you already have that set up.

## Run locally

1. Clone the repo

```sh
git clone https://github.com/dabit3/full-stack-ethereum.git
```

2. Install the dependencies

```sh
npm install

# or

yarn
```

3. Start the local test node

```sh
npx hardhat node
```

4. Deploy the contract

```sh
npx hardhat run scripts/deploy.js --network localhost
```

5. Update __src/App.js__ with the values of your contract addresses (`greeterAddress` and `tokenAddress`)

6. Run the app

```sh
npm start
```