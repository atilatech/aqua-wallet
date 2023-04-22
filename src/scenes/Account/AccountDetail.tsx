import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
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

  const tabs = [
    {
      id: 'transactions',
      label: 'Transactions',
      component: ({account}: {account: Account}) => <AccountTransactions account={account} />,
    },
    {
      id: 'send',
      label: 'Send',
      component: ({account}: {account: Account}) => <SendCrypto account={account} />,
    },
    {
      id: 'buy-sell',
      label: 'Buy/Sell',
      component: ({account}: {account: Account}) => <BuySellCrypto />,
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className='AccountDetail container'>
        <p>
            Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank" rel="noreferrer">
            {account.address}
            </a><br/>
            Balance: {balance} ETH
        </p>
        <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
          {tabs.map(tab => (
            <li key={tab.id} className="nav-item" role="presentation">
              <button
                className={`nav-link${tab.id === activeTab.id ? ' active' : ''}`}
                id={`${tab.id}-tab`}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={tab.id === activeTab.id}
                onClick={() => setActiveTab(tab)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id={activeTab.id}
            role="tabpanel"
            aria-labelledby={`${activeTab.id}-tab`} />
                      {
                        activeTab.component({account})
                      }
      </div>
    </div>
  )
}

export default AccountDetail;
