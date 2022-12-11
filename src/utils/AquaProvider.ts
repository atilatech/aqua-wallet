import { Eip1193Bridge } from "@ethersproject/experimental";
import { Wallet } from "ethers";

export interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }

export class AquaProvider extends Eip1193Bridge {

    request = ({method, params}: RequestArguments): Promise<any> => {
        if (method === "eth_requestAccounts") {
            return this.requestAccounts();
          }
          return Promise.reject(new Error("Invalid method"));
    }
    
    // https://eips.ethereum.org/EIPS/eip-1102
    private requestAccounts = async (): Promise<Array<string>> => {

        const privateKey = ""; 
        const account = new Wallet(privateKey, this.provider);
        return Promise.resolve([account.address]);
    }
}