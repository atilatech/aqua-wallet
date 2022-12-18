import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BuySellCrypto from '../../components/BuySellCrypto';
import SendCrypto from '../../components/SendCrypto';
import { Account } from '../../models/Account';
import { goerli } from '../../models/Chain';
import { toFixedIfNecessary } from '../../utils/AccountUtils';
import './Account.css';
import AccountTransactions from './AccountTransactions';

interface AccountDetailProps {
  account: Account
}

function AccountDetail({account}: AccountDetailProps) {
  const [balance, setBalance] = useState(account.balance)

  useEffect(() => {
    const fetchData = async () => {
        const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
        let accountBalance = await provider.getBalance(account.address);
        setBalance((String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance)))));
    }
    fetchData();
}, [account.address])

  return (
    <div className='AccountDetail container'>
        <h4>
            Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank" rel="noreferrer">
            {account.address}
            </a><br/>
            Balance: {balance} ETH
        </h4>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="transactions-tab" data-bs-toggle="tab" data-bs-target="#transactions" type="button" role="tab" aria-controls="transactions" aria-selected="true">Transactions</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="buy-sell-tab" data-bs-toggle="tab" data-bs-target="#buy-sell" type="button" role="tab" aria-controls="buy-sell" aria-selected="false">Buy/Sell</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="transactions" role="tabpanel" aria-labelledby="transactions-tab">
          <AccountTransactions account={account} />
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <SendCrypto account={account} />
        </div>
        <div className="tab-pane fade" id="buy-sell" role="tabpanel" aria-labelledby="buy-sell-tab">
          <BuySellCrypto />
        </div>
      </div>
    </div>
  )
}

export default AccountDetail;
