import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
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

  const getTransactions = useCallback(
    () => {
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
                status: 'complete',
                message: '',
            });
        });
      },[account.address]
  ) ;

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="AccountTransactions">

        <h2>Transactions</h2>
        <div className="TransactionsMetaData">
            {networkResponse.status === "complete" && transactions.length === 0 && (
                <p>No transactions found for this address</p>
            )}
            <button type="button" className="btn btn-primary" onClick={getTransactions} disabled={networkResponse.status==="pending"}>
            Refresh Transactions
            </button>
            {/* Show the network response status and message */}
            {networkResponse.status && (
            <>
            {networkResponse.status === "pending" && (
            <p className="text-info">Loading transactions...</p>
            )}
            {networkResponse.status === "error" && (
            <p className="text-danger">
                Error occurred while transferring tokens: {networkResponse.message}
            </p>
            )}
            </>
            )}
        </div>
        <table className="table table-striped overflow-auto">
            <thead>
            <tr>
                <th>Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map(transaction => (
                <tr key={transaction.hash}>
                <td>
                    <a
                    href={`${goerli.blockExplorerUrl}/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {shortenAddress(transaction.hash)}
                    </a>
                </td>
                <td>
                    <a
                    href={`${goerli.blockExplorerUrl}/address/${transaction.from_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {shortenAddress(transaction.from_address)}
                    </a>
                    {transaction.from_address.toLowerCase()===account.address.toLowerCase() ? 
                        <span className="badge rounded-pill bg-warning">OUT</span>
                        :
                        <span className="badge rounded-pill bg-success">IN</span>
                    }
                </td>
                <td>
                    <a
                    href={`${goerli.blockExplorerUrl}/address/${transaction.to_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
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
    </div>
  );
};

export default AccountTransactions;