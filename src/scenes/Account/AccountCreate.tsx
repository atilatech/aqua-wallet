import React, { useState } from 'react';
import { generateAccount } from '../../utils/AccountUtils';

function AccountCreate() {
  // Declare a new state variable, which we'll call "seedphrase"
  const [seedphrase, setSeedphrase] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update the seedphrase state with the value from the text input
    setSeedphrase(event.target.value);
  }

  async function recoverAccount() {
    // Call the generateAccount function and pass it 0 and the current seedphrase
    const account = await generateAccount(0, seedphrase);
    console.log(account);
  }

  async function createAccount() {
    // Call the generateAccount function with no arguments
    const account = await generateAccount();
    console.log(account);
  }

  return (
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
  );
}

export default AccountCreate