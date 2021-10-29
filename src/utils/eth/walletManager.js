import { ethers } from "ethers";
import { REWARDS_TOKEN_ADDRESS, STAKING_TOKEN_ADDRESS } from "./config";
import { ContractManagers } from "./contractManagers";

let signer = null,
  provider = null,
  address = "";

async function getProvider() {
  if (provider) {
    return provider;
  }
  if (!window.ethereum) {
    throw new Error("MetaMask Not Detected");
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}
async function getSigner() {
  if (signer) {
    return signer;
  }
  provider = await getProvider();
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  return signer;
}
async function getWalletManager() {
  if (!provider || !signer || !address) {
    await login();
  }
  return { provider, signer, address };
}
function isLoggedIn() {
  return !!address;
}
function getAddress() {
  return address;
}
async function login(inAddress) {
  signer = await getSigner();
  address = await signer.getAddress(inAddress);
}
async function logout() {
  signer = null;
}
async function getBoundWalletManager() {
  await getWalletManager();
  return {
    address,
    signer,
    provider,
    contractManager: ContractManagers(signer || provider)
  };
}
export {
  getWalletManager,
  login,
  getBoundWalletManager,
  logout,
  getAddress,
  getProvider,
  getSigner,
  isLoggedIn
};
