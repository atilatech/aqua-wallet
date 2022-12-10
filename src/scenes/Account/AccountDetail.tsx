import React, {useState} from 'react';
import { sendToken } from '../../utils/TransactionUtils';
import { goerli } from '../../models/Chain';
import { Account } from '../../models/Account';
import AccountTransactions from './AccountTransactions';

interface AccountDetailProps {
  account: Account
}

const AccountDetail: React.FC<AccountDetailProps> = ({account}) => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });

  function handleDestinationAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseFloat(event.target.value));
  }

  async function transfer() {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    try {
      console.log("transfer:", account.privateKey);
      const { transaction, receipt } = await sendToken(amount, account.address, destinationAddress, account.privateKey);

      if (receipt.status === 1) {
        console.log(`Transaction URL: `, transaction.hash);
        // Set the network response status to "complete" and the message to the transaction hash
        setNetworkResponse({
          status: 'complete',
          message: <p>Transfer complete! <a href={`${goerli.blockExplorerUrl}/tx/${receipt.transactionHash}`} target="_blank" rel="noreferrer">
            View transaction
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
        return { receipt };
      }
    } catch (error: any) {
      // An error occurred while sending the transaction
      console.error({ error });
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: 'error',
        message: error.reason || JSON.stringify(error),
      });
    }
  }

  return (
    <div className='AccountDetail container'>
        <p>
            Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank" rel="noreferrer">
            {account.address}
            </a>
        </p>

        <div className="form-group">
            <label>Destination Address:</label>
            <input className="form-control" type="text" value={destinationAddress} onChange={handleDestinationAddressChange} />
        </div>

        <div className="form-group">
            <label>Amount:</label>
            <input className="form-control" type="number" value={amount} onChange={handleAmountChange} />
        </div>

        <button className="btn btn-primary" type="button" onClick={transfer} disabled={!amount || networkResponse.status === 'pending'}>
            Send {amount} ETH
        </button>

        {/* Show the network response status and message */}
        {networkResponse.status && 
        <>
            {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
            {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
            {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
        </>
        }

        <AccountTransactions account={account} />
    </div>
  )
}

export default AccountDetail;