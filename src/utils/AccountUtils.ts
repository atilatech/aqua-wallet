import { Wallet } from 'ethers';
import { Account } from '../models/Account';

export function generateAccount(index: number = 0, seedPhrase: string = ''): { account: Account, seedPhrase: string } {

  // If the seed phrase is not provided, generate a random mnemonic using a CSPRNG
  if (seedPhrase === '') {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }

  // Create a wallet from the mnemonic
  const path = `m/44'/60'/0'/0/${index}`;
  const wallet = Wallet.fromMnemonic(seedPhrase, path);

  const { address, privateKey } = wallet;

  console.log(`Generated account: `, { address, privateKey, seedPhrase });
  return { account: { address, privateKey }, seedPhrase };
}

export function shortenAddress(str: string, numChars: number=4) {
  return `${str.substring(0, numChars)}...${str.substring(str.length - numChars)}`;
}