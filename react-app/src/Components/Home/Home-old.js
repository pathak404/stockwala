import React from 'react'
import finance from '../../finance.json'
import Card from './Card'

function Home() {
  return (
    <div className="home-bg">
    <div className="container pt-3 pt-md-0">
      <div className="row">


      <div className="col-sm-6 col-lg-4 col-xl-3 mb-5 d-none">
          <div className="row g-3">
            <div className="col-12">
              <div className="mt-2 mt-md-3 mt-lg-5 mb-2">
                <h6 className='text-dark p-1'>Indian Stock Market</h6>
              </div>
            </div>
            {finance.IND_STOCK.map((ele, i) => (<Card data={ele} classes="col-12" type="IND_STOCK" key={i} />))}
          </div>
        </div>


        <div className="col-sm-6 col-lg-4 col-xl-3 mb-5">
          <div className="row g-3">
            <div className="col-12">
              <div className="mt-2 mt-md-3 mt-lg-5 mb-2">
                <h6 className='text-dark p-1'>U.S Stock Market</h6>
              </div>
            </div>
            {finance.US_STOCK.map((ele, i) => (<Card data={ele} classes="col-12" type="US_STOCK" key={i} />))}
          </div>
        </div>

        <div className="col-sm-7 col-lg-4 col-xl-3 mb-5 d-none">
          <div className="row g-3">
            <div className="col-12">
              <div className="mt-2 mt-md-3 mt-lg-5 mb-2">
                <h6 className='text-dark p-1'>Forex Market</h6>
              </div>
            </div>
            {finance.FOREX.map((ele, i) => (<Card data={ele} classes="col-12" type="FOREX" key={i} />))}
          </div>
        </div>

        <div className="col-sm-5 col-lg-4 col-xl-3 mb-5 d-none">
          <div className="row g-2">
            <div className="col-12">
              <div className="mt-2 mt-md-3 mt-lg-5 mb-2">
                <h6 className='text-dark p-1'>Crypto Market</h6>
              </div>
            </div>
            {finance.CRYPTO.map((ele, i) => (<Card data={ele} classes="col-6 col-sm-10 col-md-6" type="CRYPTO" key={i} />))}
          </div>
        </div>


      </div>
    </div>
    </div>
  )
}

export default Home