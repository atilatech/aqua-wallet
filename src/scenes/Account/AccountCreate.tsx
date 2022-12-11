import React, { useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';
import { Account } from '../../models/Account';
import AccountDetail from './AccountDetail';

function AccountCreate() {
  // Declare a new state variable, which we'll call "seedphrase"
  const [seedphrase, setSeedphrase] = useState('');

  // Declare a new state variable, which we'll call "account"
  const [account, setAccount] = useState<Account | null>(null);

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
  
  return (
    <div className='AccountCreate container mt-5'>
      <form onSubmit={event=>event.preventDefault()}>
        <button type="button" className="btn btn-success" onClick={createAccount}>
          Create Account
        </button>
        <div className="form-group">
          <input type="text" placeholder='Seedphrase or private key' className="form-control" value={seedphrase} onChange={handleChange} />
        </div>
        <button type="button" className="btn btn-primary mr-3" onClick={recoverAccount}>
          Recover Account
        </button>
      </form>
      {account && 
      <>
        <hr/>
        <AccountDetail account={account} />
      </>
       }
    </div>
  )

}
export default AccountCreate;