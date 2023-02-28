import React from 'react'

function PredSkeleton() {
    return (
        <div className="col-12 py-5 placeholder-glow" style={{ maxWidth: '999px' }}>
            <h4 className='placeholder px-5 py-2 rounded-1'>Price Prediction 00</h4>
            <form>
                <div className="placeholder-glow mb-3">
                    <label className="form-check-label placeholder px-5 py-2 rounded-1" htmlFor="opt1">
                    000000000000000000
                    </label>
                </div>
                <div className="placeholder-glow mb-3">
                    <label className="form-check-label placeholder px-5 py-2 rounded-1" htmlFor="opt2">
                    000000000000000000
                    </label>
                </div>
                <div className="placeholder-glow mb-3">
                    <label className="form-check-label placeholder px-5 py-2 rounded-1" htmlFor="opt3">
                    000000000000000000
                    </label>
                </div>
                <div className="placeholder-glow mb-3">
                    <label className="form-check-label placeholder px-5 py-2 rounded-1" htmlFor="opt4">
                        000000000000000000
                    </label>
                </div>
                <div className='placeholder px-5 py-3 mt-3 rounded-2'></div>
            </form>
        </div>
    )
}

export default PredSkeleton