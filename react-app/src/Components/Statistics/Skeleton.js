import React from 'react'

function Skeleton({ type }) {
    return (
        <div className="p-2 placeholder-glow">
            <h3 className='placeholder w-100 py-3 px-5 rounded-1'> </h3>

            <p className={`mb-2 rounded-1 ${type === "CRYPTO" ? 'd-none' : ''}`}>
                <span className='me-2 placeholder-glow'>
                    <span className='fw-bold placeholder rounded-start'>Open: </span>
                    <span className='placeholder rounded-end'>000</span>
                </span>
                <span className='me-2 placeholder-glow'>
                    <span className='fw-bold placeholder rounded-start'>High: </span>
                    <span className='placeholder rounded-end'>000</span>
                </span>
            </p>
            <p className={`mb-2 rounded-1 ${type === "CRYPTO" ? 'd-none' : ''}`}>
                <span className='me-2 placeholder-glow'>
                    <span className='fw-bold placeholder rounded-start'>Low:0 </span>
                    <span className='placeholder rounded-end'>000</span>
                </span>
                <span className='placeholder-glow'>
                    <span className='fw-bold placeholder rounded-start'>Close: </span>
                    <span className='placeholder rounded-end'>000</span>
                </span>
            </p>

            <p className='mb-2 placeholder-glow'>
                <span className='fw-bold placeholder px-5 rounded-start'>Volume: </span>
                <span className='placeholder rounded-end'>000</span>
            </p>

            <p className={`mb-1 placeholder-glow ${type === "CRYPTO" ? 'd-none' : ''}`}>
                <span className='fw-bold placeholder px-4 rounded-start'>Market: </span>
                <span className='placeholder rounded-end'>000</span>
            </p>
        </div>
    )
}

export default Skeleton