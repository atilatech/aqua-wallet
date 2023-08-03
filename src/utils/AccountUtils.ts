import { ethers } from 'ethers';

interface WalletData {
  seedPhrase?: string;
  privateKey: string;
  address: string;
}

export const generateWalletData = async (seedPhrase?: string): Promise<WalletData> => {
  let wallet: ethers.HDNodeWallet;

  if (!seedPhrase) {
    // Create a random mnemonic if seedPhrase is not provided
    wallet = ethers.HDNodeWallet.createRandom();
    seedPhrase = wallet.mnemonic?.phrase;
  } else {
    // Use the provided seedPhrase
    wallet = ethers.Wallet.fromPhrase(seedPhrase);
  }

  // Create a wallet from the mnemonic
  
  return {
    seedPhrase: seedPhrase,
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
};

export default generateWalletData;
