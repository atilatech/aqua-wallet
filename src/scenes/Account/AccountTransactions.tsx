import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Account } from '../../models/Account';
import { goerli } from '../../models/Chain';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../services/TransactionService';
import { shortenAddress } from '../../utils/AccountUtils';

type AccountTransactionsProps = {
  account: Account,
};


const AccountTransactions: React.FC<AccountTransactionsProps> = ({ account }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });

  useEffect(() => {
    setNetworkResponse({
        status: 'pending',
        message: '',
      });
    TransactionService.getTransactions(account.address).then(response => {
      setTransactions(response.data.result);
    }).catch(error => {
        console.log({error})
        setNetworkResponse({
            status: 'error',
            message: JSON.stringify(error),
          });
    }).finally(()=>{
        setNetworkResponse({
            status: null,
            message: '',
        });
    });
  }, [account]);

  return (
    <div>
      <h2>Transactions for Account: {account.address}</h2>
      <table>
        <thead>
            <tr>
            <th>Hash</th>
            <th>From Address</th>
            <th>To Address</th>
            <th>Value</th>
            <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map(transaction => (
            <tr key={transaction.hash}>
                <td>
                <a href={`${goerli.blockExplorerUrl}/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">
                    {shortenAddress(transaction.hash)}
                </a>
                </td>
                <td>
                  <a href={`${goerli.blockExplorerUrl}/address/${transaction.from_address}`} target="_blank" rel="noopener noreferrer">
                    {shortenAddress(transaction.from_address)}
                  </a>
                </td>
                <td>
                  <a href={`${goerli.blockExplorerUrl}/address/${transaction.to_address}`} target="_blank" rel="noopener noreferrer">
                    {shortenAddress(transaction.to_address)}
                  </a>
                </td>
                <td>
                  {ethers.utils.formatEther(transaction.value)} ETH
                </td>
                <td>
                  {new Date(transaction.block_timestamp).toLocaleString()}
                </td>
            </tr>
            ))}
        </tbody>
      </table>

      {/* Show the network response status and message */}
      {networkResponse.status && 
          <>
          {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
          {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
          {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
          </>
        }

    </div>
  );
};

export default AccountTransactions;