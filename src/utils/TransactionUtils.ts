import { ethers, Wallet } from 'ethers';

const INFURA_RPC_URL = 'https://goerli.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee';

export async function sendToken(
  amount: number,
  from: string,
  to: string,
  privateKey: string,
) {

  console.log({amount, from, to});
  // Create a provider using the Infura RPC URL for Goerli
  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  // Create a wallet instance from the sender's private key
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  console.log({provider, wallet}, wallet.address, wallet.privateKey);
  // Construct the transaction object
  const tx = {
    to,
    value: ethers.utils.parseEther(amount.toString()),
  };

  // Sign the transaction with the sender's wallet
  const transaction = await wallet.sendTransaction(tx);

  // Wait for the transaction to be mined
  const receipt = await transaction.wait();


  console.log({transaction, receipt});

  // Check the transaction status
  if (receipt.status === 1) {
    // Transaction was successful
    console.log(`Sent ${amount} ETH from ${from} to ${to}`);
    console.log(`Transaction URL: https://goerli.etherscan.io/tx/${receipt.transactionHash}`);
  } else {
    // Transaction failed
    console.log(`Failed to send ${amount} ETH from ${from} to ${to}`);
  }
}
