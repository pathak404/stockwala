import React from 'react'
import { Link } from 'react-router-dom'

function Card({ data, classes, type }) {
  return (
    <div className={classes}>
      {type === "US_STOCK" && <Link to={`/${data.symbol}`} state={{ type: type, data: data }} className="text-decoration-none text-light-2">
        <div className="card rounded bg-white shadow-sm p-2 ps-3">
          <p className='mb-0 small pb-1 font-inter fw-bold' style={{ fontSize: '14px' }}>{data.name}</p>
          <p className='mb-0 px-2 py-1 rounded-1 text-light-2' style={{ backgroundColor: '#f8f8f8', width: 'fit-content', fontSize: '0.675em' }}>{data.symbol}</p>
        </div>
      </Link>}

      {type === "CRYPTO" && 
        <div className="card rounded bg-white shadow-sm p-2 ps-3">
          <p className='mb-0 small pb-1 font-inter fw-bold' style={{ fontSize: '14px' }}>{data.name}</p>
          <p className='mb-0 px-2 py-1 rounded-1 text-light-2' style={{ backgroundColor: '#f8f8f8', width: 'fit-content', fontSize: '0.675em' }}>{data.symbol}</p>
        </div>
      }

    </div>
  )
}

export default Card