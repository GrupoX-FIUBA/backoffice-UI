import React from 'react'
import EmptyModal from './EmptyModal'

export default function ConfirmationModal({confirm, cancel, text}) {
  return (
    <EmptyModal>
        <div>
            <div className='text-white'>Are you sure you want to {text}?</div><br/>
            <div className='flex justify-around'>
                <button className='p-2 bg-green rounded hover:bg-light-green' onClick={confirm}>Confirm</button>
                <button className='p-2 bg-red-600 rounded hover:bg-red-800' onClick={cancel}>Cancel</button>
            </div>
        </div>
    </EmptyModal>
  )
}
