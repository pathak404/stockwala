# STOCKWALA

* A stock price prediction project.
* Shows live price, if market is live.
* Predict future price of a stock
* Predictive modal build by using LSTM (Long-Short Term Memory)



## Tech Stack

**Client:** React, Bootstrap\
**Server:** Flask



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
