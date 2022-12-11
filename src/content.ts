import { Eip1193Bridge } from "@ethersproject/experimental";
import { ethers } from "ethers";
import { CHAINS_CONFIG, goerli } from "./models/Chain";
import { AquaProvider } from "./utils/AquaProvider";




export function initializeBridge(){
    const chain = CHAINS_CONFIG[goerli.chainId];
    // Create a provider using the Infura RPC URL for Goerli
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    
    const signer = provider.getSigner();

    const bridge = new AquaProvider(signer, provider);
    
    window.ethereum = bridge;
    
    console.log({provider, signer}, {ethereum: window.ethereum});

}
