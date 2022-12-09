import { generateMnemonic, mnemonicToEntropy } from "ethereum-cryptography/bip39";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english";

import { HDKey } from "ethereum-cryptography/hdkey";
import { getPublicKey } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex } from "ethereum-cryptography/utils";

// seed Phrase is renamed from Mnemonic in tutorial, they mean the same thing
// 
export function generateSeedPhrase() {
  const strength = 256; // 256 bits, 24 words; default is 128 bits, 12 words
  const seedPhrase = generateMnemonic(wordlist, strength);
  return seedPhrase
}

function getAddress(_publicKey: Uint8Array) {
  return keccak256(_publicKey).slice(-20);
}

export async function generateAccount(index=0, seedPhrase: string="") {

    let privateKey: Uint8Array;
    if (!seedPhrase) {
        seedPhrase = generateSeedPhrase();
    }

    console.log(`WARNING! Never disclose your Seed Phrase:\n ${seedPhrase}`);

    const entropy = mnemonicToEntropy(seedPhrase, wordlist);
    const hdRootKey = HDKey.fromMasterSeed(entropy);
    privateKey = hdRootKey.deriveChild(0).privateKey!;
    const publicKey = getPublicKey(privateKey!);
    const address = `0x${bytesToHex(getAddress(publicKey))}`;
  
    const account = {
        privateKey: `0x${bytesToHex(privateKey)}`, address
    }
    console.log({account});
    return account
}
