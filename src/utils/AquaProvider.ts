import { Eip1193Bridge } from "@ethersproject/experimental";
import { Wallet } from "ethers";

export interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }

export class AquaProvider extends Eip1193Bridge {

    request = ({method, params}: RequestArguments): Promise<any> => {
        try {
            if (method === "eth_requestAccounts") {
                return this.requestAccounts();
              }
        }
        catch(error: any) {
            return Promise.reject(new Error(error));  
        }
          return Promise.reject(new Error("Invalid method"));
    }
    
    // https://eips.ethereum.org/EIPS/eip-1102
    private requestAccounts = async (): Promise<Array<string>> => {
        const privateKey = "0x37199c9a3d11079748093d7c64a23293fe2bcef7fcc76b7ed61074354320d8db"; 
        const account = new Wallet(privateKey, this.provider);
        return Promise.resolve([account.address]);
    }
}