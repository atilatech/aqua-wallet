import React, { useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';
import { Account } from '../../models/Account';
import { sendToken } from '../../utils/TransactionUtils';

function AccountCreate() {
  // Declare a new state variable, which we'll call "seedphrase"
  const [seedphrase, setSeedphrase] = useState('');

  // Declare a new state variable, which we'll call "accounts"
  const [accounts, setAccounts] = useState<Account[]>([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update the seedphrase state with the value from the text input
    setSeedphrase(event.target.value);
  }

  async function recoverAccount() {
    // Call the generateAccount function and pass it 0 and the current seedphrase
    const {account} = await generateAccount(0, seedphrase);

    // Update the accounts state with the newly recovered account
    setAccounts([...accounts, account]);
  }

  async function createAccount() {
    // Call the generateAccount function with no arguments
    const {account} = await generateAccount();

    // Update the accounts state with the newly created account
    setAccounts([...accounts, account]);
  }

  async function transfer(account: Account) {
    console.log("transfer:", account.privateKey)
    sendToken(0.001, account.address, "0x27F7e8d7C63C414Eae2BB07E1a9B9057a1D382cf", account.privateKey)
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
          {accounts.length > 0 ? "Create" : "Add"} Account
        </button>
      </form>
      {accounts.map((account) => (
        <div key={account.address}>
          <p>Address: {account.address}</p>
          <a href={`https://etherscan.io/address/${account.address}`}>
            View on Etherscan
          </a>
          <button type="button" onClick={()=>transfer(account)}>
            Send 0.001 ETH
          </button>
        </div>
      ))}
    </>
  );
}

export default AccountCreate;