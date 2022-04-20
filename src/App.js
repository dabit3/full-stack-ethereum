import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  const [balance, setBalance] = useState();
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [fetchedGreeting, setFetchedGreeting] = useState();
  const toast = useToast();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        setFetchedGreeting(data);
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      setBalance(balance.toString());
      console.log("Balance: ", balance.toString());
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      await fetchGreeting();
    }
  }

  async function sendCoins() {
    if (window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <VStack spacing={"10"} my="10" mx="32">
      {fetchedGreeting && (
        <Box>
          <Heading>{fetchedGreeting}</Heading>
        </Box>
      )}
      <Button onClick={fetchGreeting}>Fetch Greeting</Button>
      <Button onClick={setGreeting}>Set Greeting</Button>
      <Input
        onChange={(e) => {
          setGreetingValue(e.target.value);
          console.log(greeting);
        }}
        placeholder="Set greeting"
      />
      {balance && (
        <Box>
          <Heading>Balance: {balance}</Heading>
        </Box>
      )}

      <Button onClick={getBalance}>Get Balance</Button>
      <Button
        onClick={() => {
          sendCoins().then(
            toast({
              status: "success",
              duration: 5000,
              title: "Coins sent successfully",
              description: `Coins successfully sent to the user ${userAccount}`,
            })
          );
        }}
      >
        Send Coins
      </Button>
      <Input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="Account ID"
      />
      <Input onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
    </VStack>
  );
}

export default App;
