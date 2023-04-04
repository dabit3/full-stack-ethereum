import "./App.css";
import { useState, useEffect } from "react";
import { ethers, Wallet } from "ethers";
import { LavaEthersProvider } from "@lavanet/lava-sdk-providers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";

const greeterAddress = "0xE3313d765E5A98f3b0af355d66011D52e4194Ac9";
const tokenAddress = "0x587FB68Fd721eb8cA7D5A614F6aFdf1BC107D90B";
const account = "0xc4E057373767a6B89BcB4A347f3Da1511B736464";

require("dotenv").config();

function App() {
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [provider, setEtherProvider] = useState();

  // Init SDK on app start
  useEffect(() => {
    const initSDK = async () => {
      try {
        const provider = await new LavaEthersProvider({
          privKey: process.env.REACT_APP_LAVA_CLIENT_KEY,
          chainID: "GTH1",
          pairingListConfig: "pairingList.json",
        });
        console.log(provider);
        setEtherProvider(provider);
      } catch (err) {
        console.log(err);
      }
    };

    initSDK().catch(console.error);
  }, []);

  async function fetchGreeting() {
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
    try {
      const data = await contract.greet();
      console.log("data: ", data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function getBalance() {
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("Balance: ", balance.toString());
  }

  async function setGreeting() {
    if (!greeting) return;

    const wallet = new Wallet(process.env.REACT_APP_WALLET_KEY);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
    const transaction = await contract.setGreeting(greeting);
    await transaction.wait();
    fetchGreeting();
  }

  async function sendCoins() {
    const wallet = new Wallet(process.env.REACT_APP_WALLET_KEY);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
    const transaction = await contract.transfer(userAccount, amount);
    await transaction.wait();
    console.log(`${amount} Coins successfully sent to ${userAccount}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        />

        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
