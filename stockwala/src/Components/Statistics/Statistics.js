import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PredSkeleton from './PredSkeleton'
import Skeleton from './Skeleton'

function Statistics() {
    const location = useLocation()
    const type = location.state?.type
    const symbolData = location.state?.data
    const navigate = useNavigate()
    const { symbol } = useParams()
    let socket = undefined
    const [liveData, setLiveData] = useState({})
    const [predictInit, setPredictInit] = useState({})
    const [isProgress, setIsProgress] = useState(false)
    const [predictionResult, setPredictionResult] = useState(0)

    useEffect(() => {
        if (type === undefined || symbolData === undefined) {
            navigate("/")
        }

        if (type === 'CRYPTO') {
            crypto_US_Socket()
        }
        else if (type === 'US_STOCK') {
            fetchOneDayData()
            crypto_US_Socket()
            initpredict()
        }

        return () => {
            socket !== undefined && unsubscribe(symbol)
        }
        // eslint-disable-next-line
    }, [])



    const crypto_US_Socket = () => {
        socket = new WebSocket('wss://ws.finnhub.io?token=cftc501r01qokdd06m8gcftc501r01qokdd06m90');
        // Connection opened -> Subscribe
        socket.addEventListener('open', function (event) {
            if (type === "CRYPTO") {
                socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:' + symbol + 'USDT' }))
            }
            else {
                socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }))
            }
        })
        // Listen for messages
        socket.addEventListener('message', function (event) {
            let { data } = JSON.parse(event.data)
            if (data !== undefined) {
                // console.log(data)
                setLiveData({ p: data[0]?.p, v: data[0].v })
            }
        })
    }

    var unsubscribe = function (symbol) {
        if (socket.readyState !== WebSocket.CONNECTING) {
            if (type === "CRYPTO") {
                socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': 'BINANCE:' + symbol + 'USDT' }))
            }
            else {
                socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol }))
            }
        }
    }

    const getCurrency = () => {
        if (type === 'IND_STOCK') {
            return '₹'
        } else {
            return '$'
        }
    }

    const isMarketOpen = () => {
        let time = new Date()
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let day = time.getDay()
        if (day === 0 || day === 6) {
            return false;
        }

        if (type === "US_STOCK") {
            return hours >= 19 && (hours <= 1 && minutes <= 30)
        }
        if (type === "IND_STOCK") {
            return hours >= 9 && (hours <= 15 && minutes <= 30)
        }
    }


    const fetchOneDayData = () => {
        try {
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cftc501r01qokdd06m8gcftc501r01qokdd06m90`)
                .then((response) => {
                    if (response.status === 429) {
                        toast.error("API Limit is exceeded 😥")
                        return 0
                    }
                    return response.json()
                })
                .then((result) => {
                    setLiveData({
                        p: result.c,
                        l: result.l,
                        c: result.pc,
                        h: result.h,
                        o: result.o,
                        dp: result.dp
                    })
                }).catch((error) => {
                    toast.error(error.message)
                })
        } catch (err) {
            toast.error(err.message)
        }
    }


    const initpredict = () => {
        try {
            fetch(`https://clgproject.thetagcode.com/${symbol}`)
                .then((response) => {
                    return response.json()
                }).then((result) => {
                    if (result.status === 1) {
                        setPredictOptions(result.data[0][0], result.data[1][0], result.data[2][0], result.data[3][0])
                    } else {
                        toast.error(result.data.message)
                    }
                }).catch((error) => {
                    toast.error(error.message)
                })
        } catch (err) {
            toast.error(err.message)
        }
    }


    const setPredictOptions = (open, high, low, vol) => {
        setPredictInit({
            opt1: [open + 2, high + 2, low - 2, vol + 500],
            opt2: [open - 2, high - 2, low + 2, vol - 500],
            opt3: [open + 1, high + 1, low - 1, vol + 100],
            opt4: [open - 1, high - 1, low + 1, vol - 100]
        })
    }

    // const selectedOpt
    const formHandler = (e) => {
        e.preventDefault();
        let opt = document.querySelector('input[name="predOpt"]:checked').id
        if (opt === undefined || opt === null) {
            return;
        }
        setIsProgress(true)
        setPredictionResult(0)
        const toastid = toast.loading("Promise is pending")
        let optionData = predictInit[opt]
        
        try {
            fetch(`https://clgproject.thetagcode.com/${symbol}/predict?open=${optionData[0]}&high=${optionData[1]}&low=${optionData[2]}&vol=${optionData[3]}`)
                .then((response) => {
                    return response.json()
                }).then((result) => {
                    if (result.status === 1) {
                        setPredictionResult(result.data?.prediction[0])
                        toast.update(toastid, { render: "Promise resolved 👌", type: "success", isLoading: false, autoClose: true })
                    } else {
                        toast.update(toastid, { render: result.data.message, type: "error", isLoading: false, autoClose: true })
                    }
                    setIsProgress(false)
                }).catch((error) => {
                    toast.update(toastid, { render: error.message, type: "error", isLoading: false, autoClose: true })
                    setIsProgress(false)
                })
        } catch (err) {
            toast.update(toastid, { render: err.message, type: "error", isLoading: false, autoClose: true })
        }
    }

    return (
        <div className='bg-white d-grid place-items-center'>
            <div className="container py-5" style={{ maxWidth: '999px' }}>
                <div className="row g-2">

                    <div className="col-sm-5 col-md-6">
                        <div className="hstack align-items-center">
                            <div className="p-2">
                                <img src={symbolData?.image} width={100} height={100} alt={symbol} />
                            </div>
                            <div className="p-2">
                                <h3 className='text-dark'>{symbolData?.name}</h3>
                                <p>{symbolData?.symbol}</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-7 col-md-6">
                        <div className="hstack align-items-center mt-3 mt-sm-1">

                            {JSON.stringify(liveData) === "{}" && <Skeleton type={type} />}

                            {liveData?.p && <div className="p-2">
                                <h3 className='text-dark'>{getCurrency()} {liveData?.p}</h3>
                                {liveData?.o && <><p className={`mb-1 ${type === "CRYPTO" ? 'd-none' : ''}`}>
                                    <span className='me-2'>
                                        <span className='fw-bold'>Open: </span>
                                        <span>{liveData?.o}</span>
                                    </span>
                                    <span className='me-2'>
                                        <span className='fw-bold'>High: </span>
                                        <span>{liveData?.h}</span>
                                    </span>
                                </p>
                                    <p className={`mb-1 ${type === "CRYPTO" ? 'd-none' : ''}`}>
                                        <span className='me-2'>
                                            <span className='fw-bold'>Low: </span>
                                            <span>{liveData?.l}</span>
                                        </span>
                                        <span>
                                            <span className='fw-bold'>Close: </span>
                                            <span>{liveData?.c}</span>
                                        </span>
                                    </p></>}

                                {liveData?.v && <p className='mb-1'>
                                    <span className='fw-bold'>Volume: </span>
                                    <span>{liveData?.v}</span>
                                </p>}

                                {liveData?.o && <p className={`mb-1 ${type === "CRYPTO" ? 'd-none' : ''}`}>
                                    <span className='fw-bold'>Market: </span>
                                    <span>{isMarketOpen() ? "Open" : "Closed"}</span>
                                </p>}
                            </div>}
                        </div>
                    </div>




                    {JSON.stringify(predictInit) === '{}' && <PredSkeleton />}
                    {JSON.stringify(predictInit) !== '{}' && <div className="col-12 py-5" style={{ maxWidth: '999px' }}>
                        <h3 className='pb-2'>Price Prediction</h3>
                        <form onSubmit={formHandler}>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name="predOpt" id="opt1" />
                                <label className="form-check-label" htmlFor="opt1">
                                    {(predictInit?.opt1).toString()}
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name="predOpt" id="opt2" />
                                <label className="form-check-label" htmlFor="opt2">
                                    {(predictInit?.opt2).toString()}
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name="predOpt" id="opt3" />
                                <label className="form-check-label" htmlFor="opt3">
                                    {(predictInit?.opt3).toString()}
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name="predOpt" id="opt4" />
                                <label className="form-check-label" htmlFor="opt4">
                                    {(predictInit?.opt4).toString()}
                                </label>
                            </div>
                            <p className="small">(Open, High, Low, Volume)</p>
                            {predictionResult === 0 || <div className='bg-success p-2 text-white rounded-1 mb-1' style={{maxWidth: "340px"}}>
                                <p className='ps-1 mb-0'>Close Prediction: {predictionResult}</p>
                            </div>}
                            <button className="w-auto btn btn-primary d-flex justify-content-center align-items-center gap-2 mt-3 px-4 py-2" type="submit" disabled={isProgress}>
                                {isProgress && <span className="spinner-border spinner-border-sm" style={{ width: '24px', height: '24px' }} role="status" aria-hidden="true"></span>}
                                {isProgress ? '' : 'Check'}
                            </button>
                        </form>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Statistics