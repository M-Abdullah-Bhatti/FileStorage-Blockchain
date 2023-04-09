import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileStorageMarketplace from "../FileStorageMarketplace.json";

export function useEthereum() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  async function connectToEthereum() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        const newSigner = newProvider.getSigner();
        const newContract = new ethers.Contract(
          FileStorageMarketplace.address,
          FileStorageMarketplace.abi,
          newSigner
        );

        setProvider(newProvider);
        setSigner(newSigner);
        setContract(newContract);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("No Ethereum wallet found.");
    }
  }

  useEffect(() => {
    connectToEthereum();
  }, []);

  return { provider, signer, contract };
}
