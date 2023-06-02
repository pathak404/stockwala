import React from 'react'
import finance from '../../finance.json'
import Card from './Card'

function Home() {







  
  return (
    <div className="bg-white">
    <div className="container pt-3 pt-md-0">
      <div className="row">

        <div className="col-12 mb-5">
          <div className="row g-3">
            <div className="col-12">
              <div className="mt-2 mt-md-3 mt-lg-5 mb-2">
                <h6 className='text-dark p-1'>U.S Stock Market</h6>
              </div>
            </div>
            {finance.US_STOCK.map((ele, i) => (<Card data={ele} classes="col-sm-6 col-lg-4 col-xl-3" type="US_STOCK" key={i} />))}
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Home