![The Complete Guide to Full Stack Ethereum Development
](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fxq0yu3jd7qw35itdxii.jpg)

This codebase goes along with the tutorial [The Complete Guide to Full Stack Ethereum Development](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

The video course for this codebase is located [here](https://www.youtube.com/watch?v=a0osIaAOFSE)

## Getting started

Here's how to deploy this project

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