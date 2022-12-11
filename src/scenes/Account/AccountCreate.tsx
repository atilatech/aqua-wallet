import React, { useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';
import { Account } from '../../models/Account';
import AccountDetail from './AccountDetail';

function AccountCreate() {
  // Declare a new state variable, which we'll call "seedphrase"
  const [seedphrase, setSeedphrase] = useState('');

  // Declare a new state variable, which we'll call "account"
  const [account, setAccount] = useState<Account | null>(null);

  // Declare a new state variable, which we'll call "showRecoverInput"
  // and initialize it to false
  const [showRecoverInput, setShowRecoverInput] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update the seedphrase state with the value from the text input
    setSeedphrase(event.target.value);
  }

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      
      // Call the generateAccount function and pass it 0 and the current seedphrase
      const result = await generateAccount(seedphrase);

      // Update the account state with the newly recovered account
      setAccount(result.account);
    }
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
        <button type="button" className="btn btn-primary" onClick={createAccount}>
          Create Account
        </button>
        {/* Add a button to toggle showing the recover account input and button */}
        <button type="button" className="btn btn-outline-primary ml-3" onClick={() => setShowRecoverInput(prevShowRecoverInput => !prevShowRecoverInput)}>
          Recover account
        </button>
        {/* Show the recover account input and button if showRecoverInput is true */}
        {showRecoverInput && (
          <div className="form-group mt-3">
            <input type="text" placeholder='Seedphrase or private key for recovery' className="form-control" 
            value={seedphrase} onChange={handleChange} onKeyDown={handleKeyDown}/>
          </div>
        )}
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