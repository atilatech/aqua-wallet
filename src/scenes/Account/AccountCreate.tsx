import React, { useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';
import { Account } from '../../models/Account';
import { sendToken } from '../../utils/TransactionUtils';
import { goerli } from '../../models/Chain';

function AccountCreate() {
  // Declare a new state variable, which we'll call "seedphrase"
  const [seedphrase, setSeedphrase] = useState('');

  // Declare a new state variable, which we'll call "account"
  const [account, setAccount] = useState<Account | null>(null);

    // Declare a new state variable, which we'll call "networkResponse"
    const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
      status: null,
      message: '',
    });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update the seedphrase state with the value from the text input
    setSeedphrase(event.target.value);
  }

  async function recoverAccount() {
    // Call the generateAccount function and pass it 0 and the current seedphrase
    const result = await generateAccount(0, seedphrase);

    // Update the account state with the newly recovered account
    setAccount(result.account);
  }

  async function createAccount() {
    // Call the generateAccount function with no arguments
    const result = await generateAccount();

    // Update the account state with the newly created account
    setAccount(result.account);
  }

  async function transfer() {
    if (account === null) {
      return;
    }

    // Set the network response status to "pending"
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    try {
      console.log("transfer:", account.privateKey)
      const { transaction, receipt} = await sendToken(0.001, account.address, "0x27F7e8d7C63C414Eae2BB07E1a9B9057a1D382cf", account.privateKey);

      if (receipt.status === 1) {

        
        console.log(`Transaction URL: `, transaction.hash);
        // Set the network response status to "complete" and the message to the transaction hash
        setNetworkResponse({
          status: 'complete',
          message: <p>Transfer complete! <a href={`${goerli.blockExplorerUrl}/tx/${receipt.transactionHash}`} target="_blank">
            View transation
            </a></p>,
        });
        return receipt;
      } else {
        // Transaction failed
        console.log(`Failed to send ${receipt}`);
        // Set the network response status to "error" and the message to the receipt
        setNetworkResponse({
          status: 'error',
          message: JSON.stringify(receipt),
        });
        return {receipt}
      }
    }  catch (error: any) {
      // An error occurred while sending the transaction
      console.error({error});
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: 'error',
        message: error.reason||JSON.stringify(error),
      });
    }
  }
  
  return (
    <>
      <form>
        <label>
          Seedphrase:
          <input type="text" value={seedphrase} onChange={handleChange} />
        </label>
        <button type="button" onClick={recoverAccount}>
          Recover Account
        </button>
        <button type="button" onClick={createAccount}>
          Create Account
        </button>
      </form>
      {account && <div key={account.address}>
          <p>Address: {account.address}</p>
          <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank" rel="noreferrer">
            View on Etherscan
          </a>
          <button type="button" onClick={transfer}>
            Send 0.001 ETH
          </button>
          {/* Show the network response status and message */}
          {networkResponse.status && 
          <>
          {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
          {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
          {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
          </>
          }
        </div>}
    </>
  )

}
export default AccountCreate;