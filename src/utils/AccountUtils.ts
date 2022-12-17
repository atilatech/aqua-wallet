import { Wallet } from 'ethers';
import { Account } from '../models/Account';

export function generateAccount(seedPhrase: string = "", index: number = 0): 
{ account: Account, seedPhrase: string } {
  let wallet: Wallet;

  // If the seed phrase is not provided, generate a random mnemonic using a CSPRNG
  if (seedPhrase === "") {
    seedPhrase = Wallet.createRandom().mnemonic.phrase;
  }

  // If the seed phrase does not contain spaces, it is likely a mnemonic
  wallet = (seedPhrase.includes(" ")) ? Wallet.fromMnemonic(seedPhrase, `m/44'/60'/0'/0/${index}`) : 
  new Wallet(seedPhrase);

  const { address } = wallet;
  const account = { address, privateKey: wallet.privateKey, balance: "0" };
  
  // If the seedphrase does not include spaces then it's actually a private key, so return a blank string.
  return { account, seedPhrase: seedPhrase.includes(" ")? seedPhrase : "" };
}

export function shortenAddress(str: string, numChars: number=4) {
  return `${str.substring(0, numChars)}...${str.substring(str.length - numChars)}`;
}

export function toFixedIfNecessary( value: string, decimalPlaces: number = 2 ){
  return +parseFloat(value).toFixed( decimalPlaces );
}