# STOCKWALA

![ReactJS >= 18.2](https://img.shields.io/badge/ReactJS-%3E%3D18.2-61DBFB)
![Axios >= 1.2.2](https://img.shields.io/badge/Axios-%3E%3D1.2.2-fb015b)
![RRD >= 6.6.2](https://img.shields.io/badge/RRD-%3E%3D6.6.2-blueviolet)
![RTLB >= 2.3.10](https://img.shields.io/badge/RTLB-2.3.1-orange)
![Build](https://img.shields.io/badge/test-pass-brightgreen)


* A stock price prediction project.
* Shows live price, if market is live.
* Predict future price of a stock
* Predictive modal build by using LSTM (Long-Short Term Memory)

<br/>

## Tech Stack

**Client:** ReactJS, Bootstrap v5.3\
**Server:** Flask

<br/>

## Getting Started 

*go to the react-app dir: `cd react-app`*


### Environment Variables

*Create .env file inside `react-app` and add -*

`REACT_APP_FINNHUB_TOKEN` = "YOUR FINNHUB.IO TOKEN"

`REACT_APP_PREDICTION_API` = "URL OF FLASK APPLICATION"

<br/>

#### `npm install`
Run this command to install all the dependencies.

#### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

<br/>

## Setup Flask API

*go to the flask-app dir: `cd flask-app`*

#### `pip install . -r requirements.txt`
Run this command to install all the required modules.

#### `python main.py`
Run this command to start the development server at http://127.0.0.1:5000

**Note: Add this URL inside .env file of react-app.**


<br/>

## API Reference

#### Check API status

```http
  GET /
```

```json
{
  "status": 1,
  "data": {
    "message": "Welcome :)"
    }
  }
```



#### Get current price by symbol

```http
  GET /${symbol}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `symbol`      | `string` | **Required**. Symbol of the stock |


```json
{
  "status": 1,
  "data": {
    "high": 183.88999938964844,
    "low": 180.97000122070312,
    "open": 181.27000427246094,
    "vol": 54274900
    }
  }
```



#### Predict price of the stock

```http
  GET /${symbol}/predict
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `open`      | `float` | **Required**. Open price |
| `high`      | `float` | **Required**. High price |
| `low`      | `float` | **Required**. Low price |
| `vol`      | `int` | **Required**. Volume  |


```json
{
  "status": 1,
  "data": {
    "prediction": 186.88844
    }
  }
```

<br/>

#### Handle Errors
- Check HTTP response code
- Check the `status` of the returned data 
```json
{
  "status": 0,
  "data": {
    "message": "The error message"
    }
  }
```
