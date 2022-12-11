import { ethers } from "ethers";
import { CHAINS_CONFIG, goerli } from "./models/Chain";
import { AquaProvider } from "./utils/AquaProvider";

// use this to keep track of what content script version is being used
console.log("Content Script version: ", 1);

export function initializeBridge(){
    const chain = CHAINS_CONFIG[goerli.chainId];
    // Create a provider using the Infura RPC URL for Goerli
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    
    const signer = provider.getSigner();

    const bridge = new AquaProvider(signer, provider);
    window.ethereum = bridge;

    window.ethereum = new Proxy(window.ethereum, {
        // Proxy handler that intercepts function calls and property accesses
        apply: function(target, thisArg, args: any[]) {
          // Log the function call
          console.log(`apply: ${target.name} called with arguments:`, args);
      
          // Call the original function
          return Reflect.apply(target, thisArg, args);
        },
      
        get: function(target, prop) {
          // Return a function if the property is a function
          if (typeof target[prop] === "function") {
            return function(...args: any) {
              // Log the function call
              console.log(`get: ${String(prop)} called with arguments:`, args);
      
              // Call the original function
              return target[prop](...args);
            };
          }
      
          // Return the original property value
          return target[prop];
        },
      });

    console.log({provider, signer}, {ethereum: window.ethereum});


}

