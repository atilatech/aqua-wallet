import React from 'react';
import generateWalletData from '../../utils/AccountUtils';

const AccountCreate: React.FC = () => {
  const createAccount = () => {
    // Add your logic for creating an account here
    const wdata = generateWalletData();
    console.log(wdata);
  };

  return (
    <div>
      {/* Add any other content or form fields here if needed */}
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
};

export default AccountCreate;
