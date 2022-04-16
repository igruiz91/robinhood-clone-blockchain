import { createContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  btcAbi,
  ethAbi,
  solAbi,
  linkAbi,
  dogeAbi,
  daiAbi,
  usdcAbi,
  btcAddress,
  ethAddress,
  dogeAddress,
  solanaAddress,
  linkAddress,
  daiAddress,
  usdcAddress,
} from "../lib/constants";

export const RobinHoodContext = createContext();

export const RobinHoodProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formattedAccount, setFormattedAccount] = useState("");
  const [coinSelect, setCoinSelect] = useState("BTC");
  const [toCoin, setToCoin] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");

  const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    ethBalance();
  }, [isAuthenticated, enableWeb3]);

  const ethBalance = async () => {
    if (isAuthenticated) {
      const account = user.get("ethAddress");
      let formattedAccount = account.slice(0, 4) + "..." + account.slice(-4);
      setCurrentAccount(account);
      setFormattedAccount(formattedAccount);
      const currentBalance = await Moralis.Web3API.account.getNativeBalance({
        chain: "rinkeby",
        address: currentAccount,
      });
      const balanceToEth = await Moralis.Units.FromWei(currentBalance.balance);
      const formattedBalance = parseFloat(balanceToEth).toFixed(3);
      setBalance(formattedBalance);
    }
  }

  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: currentAccount,
        }),
      });

      const data = await response.json();
    })();
  }, [currentAccount]);

  const getContractAddress = () => {
    if (coinSelect === "BTC") return btcAddress;
    if (coinSelect === "ETH") return ethAddress;
    if (coinSelect === "SOL") return solanaAddress;
    if (coinSelect === "LINK") return linkAddress;
    if (coinSelect === "DOGE") return dogeAddress;
    if (coinSelect === "DAI") return daiAddress;
    if (coinSelect === "USDC") return usdcAddress;
  };

  const getToAddress = () => {
    if (toCoin === "BTC") return btcAddress;
    if (toCoin === "ETH") return ethAddress;
    if (toCoin === "SOL") return solanaAddress;
    if (toCoin === "LINK") return linkAddress;
    if (toCoin === "DOGE") return dogeAddress;
    if (toCoin === "DAI") return daiAddress;
    if (toCoin === "USDC") return usdcAddress;
  };

  const getToAbi = () => {
    if (toCoin === "BTC") return btcAbi;
    if (toCoin === "ETH") return ethAbi;
    if (toCoin === "SOL") return solAbi;
    if (toCoin === "LINK") return linkAbi;
    if (toCoin === "DOGE") return dogeAbi;
    if (toCoin === "DAI") return daiAbi;
    if (toCoin === "USDC") return usdcAbi;
  };

  const saveTransaction = async (txHash, amount, toAddress) => {
    await fetch("/api/swapTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txHash: txHash,
        from: currentAccount,
        to: toAddress,
        amount: parseFloat(amount),
      }),
    });
  };

  const sendEth = async () => {
    if (!isAuthenticated) return;
    const contractAddress = getToAddress();

    let options = {
      type: "native",
      amount: Moralis.Units.ETH("0.01"),
      receiver: contractAddress,
    };
    const transaction = await Moralis.transfer(options);
    const receipt = await transaction.wait();
    console.log(receipt);
    saveTransaction(receipt.transactionHash, "0.01", receipt.to);
  };

  const mint = async () => {
    try {
    
      if (coinSelect === "ETH") {
        if (!isAuthenticated) return;
        await Moralis.enableWeb3();
        const contractAddress = getToAddress();
        const abi = getToAbi();

        let options = {
          contractAddress: contractAddress,
          functionName: "mint",
          abi: abi,
          params: {
            to: currentAccount,
            amount: await Moralis.Units.Token("50", "18"),
          },
        };
        sendEth();
        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        console.log(receipt);
        saveTransaction(receipt.transactionHash, amount, receipt.to);
      } else {
        swapTokens();
        saveTransaction(receipt.transactionHash, amount, receipt.to);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return;
      await Moralis.enableWeb3();

      if (coinSelect === toCoin) return;

      const fromOptions = {
        type: "erc20",
        amount: Moralis.Units.Token(amount, "18"),
        receiver: getContractAddress(),
        contractAddress: getContractAddress(),
      };
      const toMintOptions = {
        contractAddress: getToAddress(),
        functionName: "mint",
        abi: getToAbi(),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, "18"),
        },
      };
      let fromTransaction = await Moralis.transfer(fromOptions);
      let toMintTransaction = await Moralis.executeFunction(toMintOptions);
      let fromReceipt = await fromTransaction.wait();
      let toReceipt = await toMintTransaction.wait();
      console.log(fromReceipt);
      console.log(toReceipt);
    } catch (error) {
      console.error(error.message);
    }
  };

  const connectWallet = () => {
    authenticate();
  };
  const signOut = () => {
    logout();
  };

  return (
    <RobinHoodContext.Provider
      value={{
        connectWallet,
        currentAccount,
        signOut,
        isAuthenticated,
        formattedAccount,
        setAmount,
        mint,
        setCoinSelect,
        coinSelect,
        balance,
        swapTokens,
        amount,
        toCoin,
        setToCoin,
      }}
    >
      {children}
    </RobinHoodContext.Provider>
  );
};
