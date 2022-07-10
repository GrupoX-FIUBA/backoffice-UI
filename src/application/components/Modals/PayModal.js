import React, { useState } from 'react'
import EmptyModal from './EmptyModal'

export default function PayModal({confirm, cancel, user}) {
    const [amount, setAmount] = useState(0)
  return (
    <EmptyModal>
        <div>
            <div className='text-white'>Pay to {user.userName}</div>
            <div className='text-white'>(In ETH)</div><br/>
            <input className='p-2' type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <div className='flex justify-around mt-10'>
                <button className='p-2 bg-green rounded hover:bg-light-green' onClick={() => confirm(amount)}>Confirm</button>
                <button className='p-2 bg-red-600 rounded hover:bg-red-800' onClick={cancel}>Cancel</button>
            </div>
        </div>
    </EmptyModal>
  )
}
